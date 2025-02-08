'use client'

export default function MessageNotification() {
  return (
    <div className="fixed bottom-4 right-4">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="font-bold">新消息通知</h3>
        <p>您有新的寄养请求</p>
      </div>
    </div>
  )
} 