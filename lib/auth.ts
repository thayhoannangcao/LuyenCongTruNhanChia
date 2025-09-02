import { supabase } from './supabase'

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
    const fakeEmail = `${data.username}.1474.math.app.thayhoan@gmail.com`
    
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
    const fakeEmail = `${data.username}.1474.math.app.thayhoan@gmail.com`
    
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
