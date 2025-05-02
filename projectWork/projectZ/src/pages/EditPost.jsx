
import React, {useEffect,useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { Container,PostForm } from '../components/index.js'
import appwriteService from '../appWritefiles/config.js'
function EditPost() {
     const [post, setPosts] = useState(null);
     
     const {slug}= useParams()
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const navigate = useNavigate()
     useEffect(()=>{
        if(slug){
            appwriteService.getPosts(slug).then((post)=>{
                if(post){
                setPosts(post.documents)
            }else{
                navigate('/')
         } })
      }
     },[slug,navigate])

     return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
      ) : null
    }

export default EditPost
