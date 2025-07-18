const EmailTemplates = ({template, email}) =>{
    return(
      <>
  
  
  <div style={styles.card} className="w-full">
    <div style={styles.avatarContainer} className="bg-[#0044cc] text-white rounded-t-[10px] py-2 font-bold text-left px-4">
    Title
    </div>
    <div style={styles.content} className="text-left px-8 text-[15px]">
      <div  className="text-[15px]" >Dear Username,</div>
      <p className="my-4">Content</p>


      {template.img  && (
        <div> 
            
          {email.img ? (
              <img src={URL.createObjectURL(email.img)}/>
          ): (
            <img className="" src="https://img.freepik.com/premium-vector/dummy-text-headline-flyer-design-template-use-vertical-layout-combination-yellow-orange-purple_64718-861.jpg"/>
          )}
             </div>
      )}

{template.link && (
        <div className="mt-3"> link : <span className="underline text-blue-500">{email?.link?.length >= 1 ? email.link : 'http://churchdb.com' }</span> </div>
      )}
    </div>
    <div className="bg-gray-400 rounded-b-[10px] mt-4 p-5"></div>
  </div>
      

     
      
      
      </>
    )
  }
  
  export default EmailTemplates;


  const styles = {
    card: {
      width: '100%',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    avatarContainer: {
      marginBottom: '15px',
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    content: {
      paddingTop: '10px',
    },
    name: {
      margin: '0',
      fontSize: '1.2rem',
    },
    title: {
      margin: '5px 0',
      color: '#666',
    },
    button: {
      marginTop: '10px',
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };
  