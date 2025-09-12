import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Dialog from './Dialog'
import Button from '../Button'

export default {
  title: 'Common/Dialog',
  component: Dialog,
} as Meta<typeof Dialog>

const dialogContent = {
  trigger: <Button title="Edit info" />,
  title: <div>Specify the number of data acquisitions</div>,
  footer: <Button title="Submit" />,
}

export const DialogExtraLarge: StoryObj<typeof Dialog> = {
  render() {
    return (
      <Dialog
        title={dialogContent.title}
        footer={dialogContent.footer}
        trigger={dialogContent.trigger}
        size="xl"
      >
        <div className="bg-content-neutral-main p-2">
          ※ If the number of applicable companies exceeds 1,000, the download
          will not proceed. Please adjust the search conditions so that the
          number of applicable companies is 1,000 or less. ※ If the specified
          download quantity exceeds the monthly allowable download quantity, the
          download will not proceed. Please set the download quantity to be
          within the allowable download quantity and then execute. ※ If the data
          already obtained is also included in the search target, it will be
          counted in the number of cases, so please be careful. If you specify
          exclusion of already downloaded data, it can be excluded.
        </div>
      </Dialog>
    )
  },
}

export const DialogLarge: StoryObj<typeof Dialog> = {
  render() {
    return (
      <Dialog
        size="lg"
        title={dialogContent.title}
        footer={dialogContent.footer}
        trigger={dialogContent.trigger}
      >
        <div className="bg-content-neutral-main p-2">
          ※ If the number of applicable companies exceeds 1,000, the download
          will not proceed. Please adjust the search conditions so that the
          number of applicable companies is 1,000 or less. ※ If the specified
          download quantity exceeds the monthly allowable download quantity, the
          download will not proceed. Please set the download quantity to be
          within the allowable download quantity and then execute. ※ If the data
          already obtained is also included in the search target, it will be
          counted in the number of cases, so please be careful. If you specify
          exclusion of already downloaded data, it can be excluded.
        </div>
      </Dialog>
    )
  },
}

export const DialogMedium: StoryObj<typeof Dialog> = {
  render() {
    return (
      <Dialog
        size="md"
        title={dialogContent.title}
        footer={dialogContent.footer}
        trigger={dialogContent.trigger}
      >
        <div className="bg-content-neutral-main p-2">
          ※ If the number of applicable companies exceeds 1,000, the download
          will not proceed. Please adjust the search conditions so that the
          number of applicable companies is 1,000 or less. ※ If the specified
          download quantity exceeds the monthly allowable download quantity, the
          download will not proceed. Please set the download quantity to be
          within the allowable download quantity and then execute. ※ If the data
          already obtained is also included in the search target, it will be
          counted in the number of cases, so please be careful. If you specify
          exclusion of already downloaded data, it can be excluded.
        </div>
      </Dialog>
    )
  },
}

export const DialogSmall: StoryObj<typeof Dialog> = {
  render() {
    return (
      <Dialog
        size="sm"
        title={dialogContent.title}
        footer={dialogContent.footer}
        trigger={dialogContent.trigger}
      >
        <div className="bg-content-neutral-main p-2">
          ※該当企業件数が1,000件を超えている場合はダウンロードされません。
          該当企業件数が1,000件以下になるように検索条件を調整してください。
          ※ご指定のダウンロード件数が当月のダウンロード可能数を超えている場合はダウンロードされません。ダウンロード件数をダウンロード可能数以下にご設定の上実行してください。
          ※データ取得済のデータも検索対象に含まれている場合、件数にカウントされますのでご注意ください。ダウンロード済除外を指定いただければ除外可能です。
        </div>
      </Dialog>
    )
  },
}

export const DialogCustomClose: StoryObj<typeof Dialog> = {
  render() {
    const [isOpen, setIsOpen] = React.useState(false)

    const handleClose = () => {
      setIsOpen(false)
    }

    const dialogContent = {
      trigger: <Button title="Edit info" onClick={() => setIsOpen(true)} />,
      title: 'Dialog Title',
      footer: <Button title="Submit" onClick={handleClose} />,
    }

    return (
      <Dialog
        title={dialogContent.title}
        footer={dialogContent.footer}
        trigger={dialogContent.trigger}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className="bg-content-neutral-main p-2">
          ※該当企業件数が1,000件を超えている場合はダウンロードされません。
          該当企業件数が1,000件以下になるように検索条件を調整してください。
          ※ご指定のダウンロード件数が当月のダウンロード可能数を超えている場合はダウンロードされません。ダウンロード件数をダウンロード可能数以下にご設定の上実行してください。
          ※データ取得済のデータも検索対象に含まれている場合、件数にカウントされますのでご注意ください。ダウンロード済除外を指定いただければ除外可能です。
        </div>
      </Dialog>
    )
  },
}
