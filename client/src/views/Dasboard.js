import React from 'react'
import  {PostContext} from '../context/PostContext'
import { useContext,useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import SinglePost from '../components/posts/SinglePost'
import UpdatePostModal from '../components/posts/UpdatePostModal'
import AddPostModal from '../components/posts/AddPostModal'
import addIcon from '../assets/plus-circle-fill.svg'
const Dasboard = () => {
//Contexts
const {authState:{user:{username}}} = useContext(AuthContext)
const{postState:{post,posts,postsLoading}, getPosts, setShowAddPostModal, showToast:{show,message,type}, setShowToast} =useContext(PostContext)

//Start get all posts
useEffect(()=>(async()=>getPosts()),[])
let body = null
if(postsLoading){
  body=(
    <div className='spinner-container'>
      <Spinner animation='border' variant ='info' />
    </div>
  )
} 
else if(posts.length ===0){
  body = (<>
  <Card className='text-center mx-5 my-5'>
    <Card.Header as='h1'>Hi {username}</Card.Header>
    <Card.Body>
<Card.Title>Welcome to LearnIT</Card.Title>
<Card.Text>
Click the button below to track your first skill to learn
</Card.Text>
<Button variant='primary'>LearnIt</Button>
    </Card.Body>
  </Card>

  <OverlayTrigger placement='left' overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
    
   <Button className='btn-floating' onClick={setShowAddPostModal.bind(this,true)}>
<img src={addIcon} width='60' height='60' />
   </Button></OverlayTrigger>
  </>)
}
else{
  body=(
    <>
    <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
{posts.map(post=>(
  <Col key={post._id} className='my-2'>
    <SinglePost post={post}/>
  </Col>
))}
    </Row>
{/* open add post */}
<OverlayTrigger placement='left' overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
    
   <Button className='btn-floating' onClick={setShowAddPostModal.bind(this,true)}>
<img src={addIcon} width='60' height='60' />
   </Button></OverlayTrigger>
    </>
  )
}
  return (
  <>
  {body}
  <AddPostModal/>
  {post !== null && <UpdatePostModal />}
  <Toast show={show} style={{position:'fixed', top:'20%', right:'10px'}} className={`bg-${type} text-white`}
  onClose={setShowToast.bind(this,{show:false,message:'', type:null})} delay={3000} autohide>
    <Toast.Body>
      <strong>xfsf</strong>
    </Toast.Body>
  </Toast>
  </>
  )
}

export default Dasboard