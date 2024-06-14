// import { RootState } from "@/Redux/store"
import { updateFullCode } from "@/Redux/slices/compilerSlice"
import CodeEditor from "@/components/CodeEditor"
import HelperHeader from "@/components/HelperHeader"
import RenderCode from "@/components/RenderCode"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { handleError } from "@/utils/handleError"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
const Compile = () => {
  const {urlId} = useParams()
  const dispatch = useDispatch();
  const loadCode = async()=>{
    try{
      const response = await axios.post("https://compiler-backend-olive.vercel.app/compiler/load",{
        urlId : urlId
      })
      dispatch(updateFullCode(response.data.fullCode));
    }catch(error){
      if(axios.isAxiosError(error)){
        if(error?.response?.status === 500){
          toast("Invalid URL, Default Code Loaded");
        }
      }
      handleError(error);
    }
  }
  useEffect(()=>{
    if(urlId){
      loadCode();
    }
  },[urlId])
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className=""
    >
      <ResizablePanel defaultSize={50}>
        <div className="h-[calc(100dvh-60px)] min-w-[350px]">
          <HelperHeader/>
          <CodeEditor/>
        </div>
      </ResizablePanel>
      
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="h-[calc(100dvh-60px)] min-w-[350px]">
          <RenderCode/>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>

  )
}

export default Compile
