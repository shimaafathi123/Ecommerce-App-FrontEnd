import image from '../../assets/jisunpark_404-error.gif'

const PageNotFound = () => {
  return (
    <div className='row m-5'>
<div className="col-md-12 col-sm-6">
      <h1 className='text-center m-auto text-danger mb-2'>404 - Page Not Found</h1>
      <p className='text-center'>Sorry, the page you are looking for does not exist.</p>
      <img className='m-auto d-flex justify-content-center'  src={image}/>
    </div>
    </div>
  );
}

export default PageNotFound;
