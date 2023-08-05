import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form'
import { useContext,useState } from 'react'
import { PostContext } from '../../context/PostContext'

const UpdatePostModal = () => {
    //Contexts
    const{
        postState:{post},
        
        showUpdatePostModal, setShowUpdatePostModal,updatePost, setShowToast} =useContext(PostContext)

    //State
    const[updatedPost, setUpdatedPost] = useState(post)

    useEffect(() =>setUpdatedPost(post),[post])

    const{title, description, url,status} = updatedPost
    const onChangeUpdatedPostForm = event => setUpdatedPost({...updatedPost, [event.target.name]: event.target.value})
    const closeDialog = () =>{
    setUpdatedPost(post) 
     setShowUpdatePostModal(false)

    }

const onSubmit = async event =>{
    event.preventDefault()
    const {success,message} = await updatePost(updatedPost)
    setShowUpdatePostModal(false)
    // resetAddPostData()
    setShowToast({show:true, message, type:success?'success':'danger'})


}
// const resetAddPostData = () =>{
//     setNewPost(  { title:'',
//     description:'',
//     url:'',
//     status:'TO LEARN'})
//     setShowAddPostModal(false)
// }

  return (
 <Modal show={showUpdatePostModal} onHide={closeDialog} >
    <Modal.Header closeButton>
        <Modal.Title>You want to change</Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
<Modal.Body>
    <Form.Group>
        <Form.Control type='text' placeholder='Title' name='title' value={title} onChange={onChangeUpdatedPostForm} required aria-describedby='title-help' />
        <Form.Text id='title-help' muted>Required</Form.Text>
    </Form.Group>
    <Form.Group>
        <Form.Control as='textarea'  row ={3} placeholder='Description' value={description} onChange={ onChangeUpdatedPostForm} name='description'/>
    
    </Form.Group>
    <Form.Control type='text' placeholder='Youtube URL'value={url} onChange={ onChangeUpdatedPostForm} name='url'/>

<Form.Group>
    <Form.Control as='select' value={status} name='status' onChange={onChangeUpdatedPostForm}>
<option value='TO LEARN'>TO LEARN</option>
<option value='LEARNING'>LEARNING</option>
<option value='LEARNED'>LEARNED</option>
    </Form.Control>
</Form.Group>


</Modal.Body>

  
    <Modal.Footer>
          <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
        <Button variant='primary' type='submit'>LearnIt</Button>
       
    </Modal.Footer>  </Form>
 </Modal>
  )
}

export default UpdatePostModal