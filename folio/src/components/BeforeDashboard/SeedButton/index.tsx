'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

const SuccessMessage: React.FC = () => (
  <div>
    演示数据已写入。可{' '}
    <a target="_blank" href="/">
      打开前台
    </a>
    {' 查看。'}
  </div>
)

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info('演示数据已写入过。')
        return
      }
      if (loading) {
        toast.info('正在写入演示数据…')
        return
      }
      if (error) {
        toast.error('出错了，请刷新后重试。')
        return
      }

      setLoading(true)

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            try {
              fetch('/next/seed', { method: 'POST', credentials: 'include' })
                .then((res) => {
                  if (res.ok) {
                    resolve(true)
                    setSeeded(true)
                  } else {
                    reject('写入演示数据失败。')
                  }
                })
                .catch((error) => {
                  reject(error)
                })
            } catch (error) {
              reject(error)
            }
          }),
          {
            loading: '正在写入演示数据…',
            success: <SuccessMessage />,
            error: '写入演示数据失败。',
          },
        )
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        setError(error)
      }
    },
    [loading, seeded, error],
  )

  let message = ''
  if (loading) message = '（写入中…）'
  if (seeded) message = '（完成）'
  if (error) message = `（错误：${error}）`

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        写入演示数据
      </button>
      {message}
    </Fragment>
  )
}
