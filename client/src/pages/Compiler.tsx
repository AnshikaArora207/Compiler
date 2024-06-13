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
const Compile = () => {
  const {urlId} = useParams()
  const dispatch = useDispatch();
  const loadCode = async()=>{
    try{
      const response = await axios.post("http://localhost:4000/compiler/load",{
        urlId : urlId
      })
      dispatch(updateFullCode(response.data.fullCode));
    }catch(error){
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