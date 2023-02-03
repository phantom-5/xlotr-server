const express = require('express');
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.get('/',async(req,res)=>{

pdf_name = 'lotr.pdf'
const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */
const pdf_path = path.join(__dirname,pdf_name)
pdfExtract.extract(pdf_path, options, (err, data) => {
  if (err) return console.log(err,'PDF extract error');
  let pages = data.pages
  var whole_book = ''
        for(let i=0;i<pages.length;i++){
            let content = pages[i].content
            if(!content){continue}
            else{
                for(let j=0;j<content.length;j++){
                   // console.log(content[j].str)
                    whole_book+=' '+content[j].str
                }
            }
        }
        console.log(whole_book.length)
        let arr_split = whole_book.split('.')
        console.log(arr_split.length)
        let temp = ''
        let final_arr = []
        for(let i=0;i<arr_split.length;i+=2){
            if (i+2 >= arr_split.length){
                let temp_arr = arr_split.slice(i,arr_split.length)
                temp = temp_arr.join('. ')
                final_arr.push(temp)
            } else {
            let temp_arr = arr_split.slice(i,i+2)
            temp = temp_arr.join('. ')
            final_arr.push(temp+'^3000')
            }
        }
        temp = final_arr[0].split(',')
        final_arr[0] = 'J.R.R. Tolkien\'s - The Lord of the Rings'
        final_arr = temp.concat(final_arr)

        return res.json({'err':0,data:final_arr})

})
})



module.exports = router