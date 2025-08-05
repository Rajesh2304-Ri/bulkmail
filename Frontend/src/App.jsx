import { useState } from "react"
import axios from "axios"
import * as XLSX from "xlsx"
import { useEffect } from "react"

function App() {
  const [msg, setmsg] = useState()
  const [status, setstatus] = useState(false)
  const [email, setemail] = useState([])

  const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

  const handleChange = (evt) => {
    setmsg(evt.target.value)
  }

  const handleSend = () => {
    axios.post("http://localhost:5000/sendmail", { msg: msg, email: email }).then((data) => {

      if (data.data === true) {
        alert("Email sent Successfully!!")
        setstatus(false)
      } else {
        alert("Failed!!")
        setstatus(false)

      }

    }).catch((error) => {
      console.log(error);

    })
    setstatus(true)

  }

  const handlefile = (event) => {

    const Files = event.target.files[0]
    console.log(Files);

    const reader = new FileReader();

    reader.onload = (e) => {

      const arraybuffer = e.target.result
      const data = new Uint8Array(arraybuffer)
      const workbook = XLSX.read(data, { type: "array" })
      const sheetname = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetname]
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      const emaillist = emailList.filter(row => row.length > 0 && row[0])
        .map((item, index) => {
          return item
        })
      console.log("EmailList:"+emaillist);

      setemail(emaillist)

    }

    reader.readAsArrayBuffer(Files)
  }
  useEffect(() => {
    if (email.length > 0) {
      console.log("Updated Email List:", email);
    }
  }, [email])

  return (
    <div>
      <div className="bg-blue-950 py-3 px-2 text-center">
        <h1 className=" text-white font-bold text-3xl">BulkMail</h1>
      </div>
      <div className="bg-blue-800 py-3 px-2 text-center">
        <h1 className=" text-white font-semibold text-lg">We can help your business with sending multiple email at once</h1>
      </div>

      <div className="bg-blue-600 py-3 px-2 text-center">
        <h1 className=" text-white font-semibold text-lg">Drag and Drop</h1>
      </div>

      <div className="bg-blue-400 py-3 px-2 text-center flex flex-col justify-center items-center">
        <textarea onChange={handleChange} value={msg} className="w-[80%] h-48 rounded-md outline-none border border-black px-2 py-2 mt-4" placeholder="Enter you email..."></textarea>
        <div className="border-2 border-white border-dashed px-3 py-2 mt-3 mb-2 ">
          <input onChange={handlefile} type="file" className="text-center" />
        </div>
        <p className="text-blue-900">Total Emails in the file : {email.length}</p>


        <button onClick={handleSend} className="bg-blue-950 text-white p-2 border rounded-lg mt-4 mb-3">{status ? "Sending...." : "Send"}</button>

      </div>

      <div className="bg-blue-500 py-10 px-2 text-center">

      </div>

      <div className="bg-blue-300 py-10 px-2 text-center">

      </div>




    </div>

  )
}

export default App
