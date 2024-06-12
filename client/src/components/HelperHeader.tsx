import React from 'react'
import { Button } from './ui/button'
import { Fullscreen, Save, Share2 } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { CompilerSliceStateType, updateCurrentLanguage } from '@/Redux/slices/compilerSlice'
import { RootState } from '@/Redux/store'
import { handleError } from '@/utils/handleError'
import axios from 'axios'

const HelperHeader = () => {
  const fullCode = useSelector((state:RootState)=>state.compilerSlice.fullCode);
  const handleSave = async()=>{
    try {
      const response = await axios.post("http://localhost:4000/compiler/save",{
        fullCode: fullCode
      })
    } catch (error) {
      handleError(error);
    }
  }
    const dispatch = useDispatch()
    const currentLanguage = useSelector((state:RootState)=>state.compilerSlice.currentLanguage)
  return (
    <div className='_helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center'>
        <div className='_btn_container flex gap-1'>
            <Button onClick={handleSave} className='flex justify-center items-center gap-1' variant="success"><Save size={16} />Save</Button>
            <Button className='flex justify-center items-center gap-1' variant="secondary"><Share2 size={16}/>Share</Button>
        </div>
        <div className='_tab_switcher flex justify-center items-center gap-1'>
            Current Language: 
        <Select defaultValue={currentLanguage} onValueChange={(value)=>dispatch(updateCurrentLanguage(value as CompilerSliceStateType["currentLanguage"]))}>
        <SelectTrigger className="w-[120px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue/>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
        </SelectContent>
        </Select>
        </div>
    </div>
  )
}

export default HelperHeader