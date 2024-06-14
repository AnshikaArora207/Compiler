import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Code, Copy, Save, Share2 } from 'lucide-react'
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
import { useNavigate, useParams } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner'

const HelperHeader = () => {
  const {urlId} = useParams();
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [sharebtn, setSharebtn] = useState<boolean>(false); 
  useEffect(()=>{
    if(urlId) setSharebtn(true);
    else setSharebtn(false);
  });
  const navigate = useNavigate();
  const fullCode = useSelector((state:RootState)=>state.compilerSlice.fullCode);
  const handleSave = async()=>{
    setSaveLoading(true);
    try {
      const response = await axios.post("https://compiler-backend-olive.vercel.app/compiler/save",{
        fullCode: fullCode
      })
      navigate(`/compiler/${response.data.url}`,{replace:true});
    } catch (error) {
      handleError(error);
    } finally{
      setSaveLoading(false);
    }
  }
    const dispatch = useDispatch()
    const currentLanguage = useSelector((state:RootState)=>state.compilerSlice.currentLanguage)
  return (
    <div className='_helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center'>
        <div className='_btn_container flex gap-1'>
            <Button onClick={handleSave} className='flex justify-center items-center gap-1' variant="success" disabled={saveLoading}><Save size={16} />{saveLoading? "Saving..." : "Save"}</Button>
            {sharebtn && 
            <Dialog>
            <DialogTrigger className='whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex justify-center items-center gap-1'><Share2 size={16}/>Share</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='flex gap-1 justify-center items-center'><Code />Share your Code.</DialogTitle>
                <DialogDescription className='flex flex-col gap-2'>
                  <div className="_url flex gap-1">
                  <input type="text" disabled className='w-full px-2 py-2 rounded bg-slate-800 text-slate-400 select-none' value={window.location.href} />
                  <Button variant="outline" onClick={()=>{
                    window.navigator.clipboard.writeText(window.location.href);
                    toast("URL copied to clipboard!")
                  }}><Copy size={14} /></Button>
                  </div>
                  <p className='text-center'>Share this URL with your friends to collaborate.</p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
            </Dialog>
            }
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
