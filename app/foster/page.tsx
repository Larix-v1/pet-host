"use client"

import { useState } from "react"
import FosterList from "@/components/FosterList"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const chengduDistricts = [
  "锦江区",
  "青羊区",
  "金牛区",
  "武侯区",
  "成华区",
  "龙泉驿区",
  "青白江区",
  "新都区",
  "温江区",
  "双流区",
  "郫都区",
  "新津区",
  "都江堰市",
  "彭州市",
  "邛崃市",
  "崇州市",
  "简阳市",
]

export default function FosterPage() {
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [petType, setPetType] = useState("")
  const router = useRouter()

  return (
    <div className="container mx-auto p-4 max-w-sm">
      <Button variant="backButton" size="sm" onClick={() => router.back()} className="mb-4 text-2xl">
      &lt;
      </Button>
      <h1 className="text-2xl font-bold mb-4 text-center">寻找寄养服务</h1>
      <div className="mb-4 flex space-x-2 w-full">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 p-2 border rounded text-sm"
        >
          <option value="">选择地区</option>
          {chengduDistricts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 p-2 border rounded text-sm"
        />
        <select
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          className="flex-1 p-2 border rounded text-sm"
        >
          <option value="">宠物类型</option>
          <option value="dog">狗</option>
          <option value="cat">猫</option>
          <option value="other">其他</option>
        </select>
      </div>
      <FosterList location={location} date={date} petType={petType} />
    </div>
  )
}

