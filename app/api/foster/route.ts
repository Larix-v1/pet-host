import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // 获取寄养服务列表
  return NextResponse.json({ 
    services: [
      // 服务数据
    ] 
  })
}

export async function POST(request: Request) {
  // 创建新的寄养服务
  const data = await request.json()
  return NextResponse.json({ success: true })
} 