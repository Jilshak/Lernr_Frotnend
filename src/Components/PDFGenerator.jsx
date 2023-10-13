import React, { useEffect, useState } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import MyPDF from './MyPDF';

const PDFGenerator = (props) => {
  const [pdfData, setPdfData] = useState(null);

  const { details, user } = props

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    console.log("User details: ", user)
  }, [])

  const generatePdf = () => {
    setPdfData(true);
    setToggle(true)
  };

  return (
    <div>
      {
        details && user ?
          <>
            {
              !toggle ?
                <>
                  <div className='bg-white h-[450px] w-[480px] flex flex-col relative bottom-16 rounded-lg items-center justify-center shadow-xl hover:shadow-2xl'>
                    <div className='mx-[20px]'>
                      <img className='rounded-md ' src={details?.course?.thumbnail} alt="" />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <p className='font-semibold text-lg my-3'>Congrats on Completing the Course</p>
                      <p>We Hope to see you again</p>
                    </div>
                    <button onClick={generatePdf} className="btn btn-wide btn-outline my-5">CLICK FOR THE DOWNLOAD LINK</button>
                  </div>
                </> : null
            }
            <BlobProvider document={<MyPDF details={details} user={user} />}>
              {({ blob, url, loading, error }) => {
                if (loading) {
                  return null;
                }
                if (error) {
                  return `Error: ${error}`;
                }
                if (pdfData) {
                  return (
                    <div className='bg-white h-[450px] w-[480px] flex flex-col relative bottom-16 rounded-lg items-center justify-center shadow-xl hover:shadow-2xl'>
                      <div className='mx-[20px]'>
                        <img className='rounded-md ' src={details?.course?.thumbnail} alt="" />
                      </div>
                      <div className='flex flex-col items-center justify-center'>
                        <p className='font-semibold text-lg my-3'>Congrats on Completing the Course</p>
                        <p>We Hope to see you again</p>
                      </div>
                      <a className='btn btn-outline btn-wide my-5' href={url} download={`${user?.username}-${details?.course?.title}`}>
                        Download PDF
                      </a>
                    </div>
                  );
                }
                return null;
              }}
            </BlobProvider>
          </> : null
      }
    </div>
  );
};

export default PDFGenerator;
