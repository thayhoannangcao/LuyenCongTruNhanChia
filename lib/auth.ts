import { supabase } from './supabase'
import { USERNAME_EMAIL_SUFFIX } from './constants'
import { supabaseLite } from './supabase-lite'
import type { ChangePasswordPayload } from './types'
import { withTimeout } from './utils'

export interface AuthUser {
  id: string
  username: string
  full_name: string
}

export interface SignUpData {
  username: string
  full_name: string
  password: string
}

export interface SignInData {
  username: string
  password: string
}

// Đăng ký tài khoản mới
export async function signUp(data: SignUpData) {
  try {
    // Tạo email giả từ username để Supabase Auth chấp nhận
    // Sử dụng email thật hoặc domain được chấp nhận
    const fakeEmail = `${data.username}${USERNAME_EMAIL_SUFFIX}`
    
    // Tạo user trong Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: fakeEmail,
      password: data.password,
      options: {
        data: {
          username: data.username,
          full_name: data.full_name
        }
      }
    })

    if (authError) {
      // Xử lý lỗi email đã tồn tại
      if (authError.message.includes('already registered')) {
        throw new Error('Tài khoản này đã tồn tại')
      }
      throw new Error(authError.message)
    }

    if (!authData.user) {
      throw new Error('Không thể tạo tài khoản')
    }

    // Tạo profile trong bảng users
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        username: data.username,
        full_name: data.full_name,
      })

    if (profileError) {
      throw new Error(profileError.message)
    }

    return { success: true, user: authData.user }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra' 
    }
  }
}

// Đăng nhập
export async function signIn(data: SignInData) {
  try {
    // Tạo email giả từ username để đăng nhập
    // Sử dụng email thật hoặc domain được chấp nhận
    const fakeEmail = `${data.username}${USERNAME_EMAIL_SUFFIX}`
    
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password: data.password,
    })

    if (error) {
      // Xử lý lỗi đăng nhập
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Tài khoản hoặc mật khẩu không đúng')
      }
      throw new Error(error.message)
    }

    if (!authData.user) {
      throw new Error('Đăng nhập thất bại')
    }

    // Lấy thông tin profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError) {
      throw new Error(profileError.message)
    }

    return { 
      success: true, 
      user: {
        id: profile.id,
        username: profile.username,
        full_name: profile.full_name,
      }
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra' 
    }
  }
}

// Đăng xuất
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra' 
    }
  }
}

// Lấy user hiện tại
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      return null
    }

    return {
      id: profile.id,
      username: profile.username,
      full_name: profile.full_name,
    }
  } catch (error) {
    return null
  }
}

// Đổi mật khẩu: xác thực lại bằng username + mật khẩu cũ, sau đó update mật khẩu mới
export async function changePassword(payload: ChangePasswordPayload) {
  try {
    // 1) Kiểm tra phiên đăng nhập hiện tại (dùng getUser trước cho nhanh)
    const { data: userData, error: userErr } = await withTimeout(
      supabase.auth.getUser(),
      8000,
      'Không thể kiểm tra phiên đăng nhập'
    )
    if (userErr || !userData?.user) {
      throw new Error('Bạn cần đăng nhập trước khi đổi mật khẩu')
    }
    // Lấy session (có thể chậm), nếu không có thì thử refresh
    let { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData?.session) {
      const { data: refreshed } = await supabase.auth.refreshSession()
      sessionData = refreshed
    }
    if (!sessionData?.session) {
      throw new Error('Không thể kiểm tra phiên đăng nhập')
    }

    // 2) Xác thực mật khẩu hiện tại bằng client không persist session
    const username = (sessionData.session.user.user_metadata as any)?.username
    if (!username) {
      throw new Error('Không tìm thấy username trong hồ sơ người dùng')
    }
    const fakeEmail = `${username}${USERNAME_EMAIL_SUFFIX}`
    const { data: verifyData, error: verifyError } = await withTimeout(
      supabaseLite.auth.signInWithPassword({
        email: fakeEmail,
        password: payload.currentPassword,
      }),
      8000,
      'Không thể xác thực mật khẩu hiện tại'
    )
    if (verifyError || !verifyData.user) {
      throw new Error('Mật khẩu hiện tại không đúng')
    }

    console.log('verifyData', verifyData)

    // 3) Cập nhật mật khẩu mới bằng REST để tránh treo do SDK
    const accessToken = sessionData.session.access_token
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const updateRes = await withTimeout(
      fetch(`${supabaseUrl}/auth/v1/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ password: payload.newPassword }),
      }),
      10000,
      'Đổi mật khẩu quá thời gian. Vui lòng thử lại.'
    )
    if (!updateRes.ok) {
      const text = await updateRes.text().catch(() => '')
      throw new Error(text || `Cập nhật mật khẩu thất bại (${updateRes.status})`)
    }


    // 4) Đăng xuất để người dùng đăng nhập lại bằng mật khẩu mới (tuỳ chọn)
    if (payload.signOutAfter) {
      await withTimeout(supabase.auth.signOut(), 5000, 'Đăng xuất quá thời gian')
    }

    // Không log signOut để tránh noise

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra',
    }
  }
}
