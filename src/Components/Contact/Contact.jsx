import React , {useState} from 'react'
import Helmet from 'react-helmet';
import SearchResults from '../SearchResults/SearchResults';
export default function Contact() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false);

    const saveToLocalStorage = () => {
        setLoading(true);
        const contactDetails = {
          name: data.name,
          email: data.email,
          message: data.message,
        };
        localStorage.setItem('contact', JSON.stringify(contactDetails));
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

  return (
    <>
    <div className='w-75 m-auto mb-5'>
      <Helmet>
        <title>Contact Us | TasteBite</title>
      </Helmet>
      <SearchResults />
    <div className="form-group">
    <h3 className='text-center mb-4'>If you have any inquiries, please don't hesitate to contact us.</h3>
    <input type="text" className="form-control mb-4" id="exampleFormControl" placeholder="Enter Your Name" onChange={(e) => setData({ ...data, name: e.target.value })} required/>
  </div>
  <div className="form-group">
    <input type="email" className="form-control mb-4" id="exampleFormControlInput1" placeholder="Enter Your Email" onChange={(e) => setData({ ...data, email: e.target.value })} required/>
  </div>
 
  <div className="form-group">
    <textarea className="form-control mb-4" id="exampleFormControlTextarea1" rows="4" placeholder='Enter Your Message' onChange={(e) => setData({ ...data, message: e.target.value })} required></textarea>
  </div>
  <div className='d-flex justify-content-end'>
  <button type="submit" className={`btn px-5`} style={{backgroundColor: "#e70404", color: "white"}} onClick={saveToLocalStorage}>
          {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Send'}
      </button>  </div>
</div>
    </>
  )
}
