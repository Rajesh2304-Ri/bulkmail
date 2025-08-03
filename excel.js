const fileInput = document.getElementById("inputFile")

fileInput.addEventListener("change", (e) => {

    const Files = e.target.files[0]
    const reader = new FileReader();

    reader.onload = (evt) => {

        const arrayBuffer = evt.target.result

        const data = new Uint8Array(arrayBuffer)

        const workbook = XLSX.read(data, { type: 'array' });
        const sheetname = workbook.SheetNames[0]
        const workSheet = workbook.Sheets[sheetname]
        const jsonData = XLSX.utils.sheet_to_json(workSheet,{header:1})
        console.log(jsonData);
         
         }

reader.readAsArrayBuffer(Files);
         
})
