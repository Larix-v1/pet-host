"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function ProvideFosterPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    hasExperience: "",
    ownPetType: "",
    address: "",
    price: "",
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(formData).some((value) => value === "")) {
      alert("请你完成内容填写")
    } else {
      console.log(formData)
      alert("成功提交，请等待审核和🐱🐕来临！")
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-sm">
      {/* 返回按钮 */}
      <Button variant="backButton" size="sm" onClick={() => router.back()} className="mb-4 text-2xl">
        &lt;
      </Button>

      <h1 className="text-2xl font-bold mb-6 text-center">提供寄养服务</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm">姓名</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm">电话</Label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <Label className="text-sm">是否有养宠经验</Label>
          <RadioGroup onValueChange={(value) => handleRadioChange("hasExperience", value)} required>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="experience-yes" />
              <Label htmlFor="experience-yes" className="text-sm">是</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="experience-no" />
              <Label htmlFor="experience-no" className="text-sm">否</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="ownPetType" className="text-sm">自有宠物类型</Label>
          <Input
            id="ownPetType"
            name="ownPetType"
            value={formData.ownPetType}
            onChange={handleChange}
            placeholder="如：猫、狗、兔子等，没有请填无"
          />
        </div>
        <div>
          <Label htmlFor="address" className="text-sm">地址</Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="h-12 resize-none"
            placeholder="如：成都市武侯区芳草苑1-3-1"
          />
        </div>
        <div>
          <Label htmlFor="price" className="text-sm">价格（元/天）</Label>
          <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
        </div>

        <Button type="submit" className="w-full text-sm py-2">
          提交
        </Button>
      </form>
    </div>
  )
}
