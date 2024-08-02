import { useState } from "react"
import { timestamp } from "../firebase/firebase"
import { useAuthContext } from "../hooks/useAuthContext"
import { useFirestore } from "../hooks/useFirestore"
import Avatar from "./Avatar"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



export default function ProjectComments({project}) {
  const { user } = useAuthContext()
  const { updateDocument, response} = useFirestore('projects')
  const [ newComment, setNewComment] = useState('')
  
  const [sortOrder, setSortOrder] = useState('newest')

const handleSortChange = (e) => {
  setSortOrder(e.target.value);
}

const sortedComments = sortOrder === 'newest'
  ? project.comments.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
  : project.comments.sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate())

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }
    
    await updateDocument(project.id, {
        comments: [...project.comments, commentToAdd]
    })

    if(!response.error){
        setNewComment('')
    }
  }

  return (
    <div className="bg-white rounded-md shadow-md p-4 mt-4">
  <h4 className="text-lg font-bold">Project discussion</h4>
  <select value={sortOrder} onChange={handleSortChange} className="p-2 rounded-md border border-gray-300 bg-white font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
    <option value="newest" className="text-gray-700">Newest</option>
    <option value="oldest" className="text-gray-700">Oldest</option>
  </select>
  <ul className="flex flex-wrap w-full mt-5">
  {project.comments.length > 0 && sortedComments.map(comment => (
    <li key={comment.id} className="w-1/2 md:w-1/4 lg:w-1/6 p-4 rounded-md border border-gray-300 shadow-md mb-4 mr-5">
      <div className="comment-author flex items-center">
        <Avatar src={comment.photoURL} className="w-12 h-12 rounded-full" />
        <p className="text-2xl font-bold">{comment.displayName}</p>
      </div>
      <div className="comment-content text-gray-700 font-medium">
        <p>{comment.content}</p>
      </div>
      <div className="comment-date text-gray-500 font-medium">
        <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
      </div>
    </li>
  ))}
</ul>

  <form className="add-comment mt-4" onSubmit={handleSubmit}>
    <label>
      <span className="text-gray-600 text-xs font-bold block mb-2">Add new comment:</span>
      <textarea
        required
        className="form-input w-full py-2 px-3 rounded-md"
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
      ></textarea>
    </label>
    <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out">Add Comment</button>
  </form>
</div>
  )
}