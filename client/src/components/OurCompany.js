import React from 'react'
import Card from 'react-bootstrap/Card';
import microsoft from '../assets/images/microsoft.png'
import Accenture from '../assets/images/Accenture.png'
import HCL from '../assets/images/HCL.png'
import Hp from '../assets/images/Hp.png'
import IBM from '../assets/images/IBM.png'
import Infosys from '../assets/images/Infosys.png'
import Oracle from '../assets/images/Oracle.png'
import TCS from '../assets/images/TCS.jpg'
import TechMahindra from '../assets/images/TechMahindra.png'
import Wipro from '../assets/images/Wipro.png'
import capegemini from '../assets/images/capgemini.png'
import aws from '../assets/images/aws.png'


const OurCompany = () => {
  return (
    <div>
        <div className='container '>
        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-5">
        <div className='row g-5 '>
    
        <div>
            <h1 className='text-center fw-bold fst-italic' > Our Companies ...</h1>
        </div>
       
     
    
        
   
        
<Card  style={{ width: '18rem', height:'15rem',padding:'3rem',marginLeft:'1em'}}>
      <Card.Img variant="top" src={microsoft} />
      </Card>
            
<Card  style={{ width: '18rem', height:'15rem',padding:'5rem',marginLeft:'1em' }}>
      <Card.Img variant="top" src={Accenture} />
    </Card>
            
<Card  style={{ width: '18rem', height:'15rem',padding:'4rem',marginLeft:'1em' }}>
      <Card.Img variant="top" src={HCL} />
    </Card>
            
<Card   style={{ width: '18rem', height:'15rem',padding:'4rem',marginLeft:'1em' }}>
      <Card.Img variant="top" src={Hp} />
    </Card>
            
<Card style={{ width: '18rem', height:'15rem',padding:'4rem',marginLeft:'1em' }}>
      <Card.Img variant="top" src={IBM} />
    </Card>
            
<Card style={{ width: '18rem', height:'15rem',padding:'5rem',marginLeft:'1em' }}>
      <Card.Img variant="top" src={Infosys} />
      
    </Card>
            
<Card style={{ width: '18rem', height:'15rem',padding:'5rem',marginLeft:'1em' }}>
      <Card.Img variant="top" src={Oracle} />
     
    </Card>
            
<Card   style={{ width: '18rem', height:'15rem',padding:'5rem',marginLeft:'1em' }}>
      <Card.Img variant="top" src={TCS} />
      
    </Card>
            
<Card style={{ width: '18rem', height:'15rem',padding:'5rem',marginLeft:'1em' }}>
      <Card.Img variant="top" src={TechMahindra} />
     
    </Card>
            
<Card style={{ width: '18rem', height:'15rem',padding:'5rem',marginLeft:'1em'}}>
      <Card.Img variant="top" src={Wipro} />
      
    </Card>

                
<Card style={{ width: '18rem', height:'15rem',padding:'5rem',marginLeft:'1em'}}>
      <Card.Img variant="top" src={capegemini} />
      
    </Card>

    <Card style={{ width: '18rem', height:'15rem',padding:'5rem',marginLeft:'1em'}}>
      <Card.Img variant="top" src={aws} />
      
    </Card>

    </div>  
   </div>
   </div>
</div>
   
  )
}

export default OurCompany