import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form'
import { useContext,useState } from 'react'
import { PostContext } from '../../context/PostContext'

const AddPostModal = () => {
    //Contexts
    const{showAddPostModal, setShowAddPostModal, addPost, setShowToast} =useContext(PostContext)

    //State
    const[newPost, setNewPost] = useState({
        title:'',
        description:'',
        url:'',
        status:'TO LEARN'
    })
    const{title, description, url} = newPost
    const onChangeNewPostForm = event => setNewPost({...newPost, [event.target.name]: event.target.value})
    const closeDialog = () =>{
        resetAddPostData()

    }

const onSubmit = async event =>{
    event.preventDefault()
    const {success,message} = await addPost(newPost)
    resetAddPostData()
    setShowToast({show:true, message, type:success?'success':'danger'})


}
const resetAddPostData = () =>{
    setNewPost(  { title:'',
    description:'',
    url:'',
    status:'TO LEARN'})
    setShowAddPostModal(false)
}

  return (
 <Modal show={showAddPostModal} onHide={closeDialog}>
    <Modal.Header closeButton>
        <Modal.Title>What do you want to learn</Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
<Modal.Body>
    <Form.Group>
        <Form.Control type='text' placeholder='Title' name='title' value={title} onChange={onChangeNewPostForm} required aria-describedby='title-help' />
        <Form.Text id='title-help' muted>Required</Form.Text>
    </Form.Group>
    <Form.Group>
        <Form.Control as='textarea'  row ={3} placeholder='Description' value={description} onChange={ onChangeNewPostForm} name='description'/>
    
    </Form.Group>
    <Form.Control type='text' placeholder='Youtube URL'value={url} onChange={ onChangeNewPostForm} name='url'/>
</Modal.Body>

  
    <Modal.Footer>
          <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
        <Button variant='primary' type='submit'>LearnIt</Button>
       
    </Modal.Footer>  </Form>
 </Modal>
  )
}

export default AddPostModal