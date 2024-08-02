import React, { useEffect, useState } from 'react'
import '../styles/Dashboard.css'
import { useCollection } from '../hooks/useCollection'
import ProjectList from '../components/ProjectList'
import { useAuthContext } from '../hooks/useAuthContext'
import { db } from '../firebase/firebase'
import ProjectFilter from '../components/ProjectFilter'
import Fuse from 'fuse.js'
import Searchbar from '../components/SearchBar'

export default function Dashboard() {

  const { user } = useAuthContext()
  const { error } = useCollection('projects')
  const { documents } = useCollection('projects', ["assignedUsersList", "array-contains", {displayName: user.displayName, id: user.uid, photoURL: user.photoURL}])
  const [res, setRes] = useState(null)
  let results = []
  let filtered = []
  let objects = []
  const [value, setValue] = useState([])
  const [resTasks, setResTasks] = useState(null)
  const [currentFilter, setCurrentFilter] = useState('all')
  
  
  var projectsRef = db.collection("projects");
  const q1 = projectsRef.where("assignedUsersList", "array-contains", {displayName: user.displayName, id: user.uid, photoURL: user.photoURL});
  const q2 = projectsRef.where("createdBy.id", "===", user.uid);
  
    const unsub = projectsRef.onSnapshot(snapshot => {
    snapshot.docs.forEach(doc => {
      var obj = {}
      obj['assignedUsersList'] = doc.data().assignedUsersList
      obj['category'] = doc.data().category
      obj['comments'] = doc.data().comments

      objects.push(obj)
      
    });
  })
  
  // const searchOptions = {
  //   includeScore: true,
  //   keys: ['name']
  // }

  // const fuse = documents ? new Fuse(documents, searchOptions) : null
  // const fuseResult = documents ? fuse.search('marketing') : null
  // console.log(fuseResult)
  // const filteredFuseResult = fuseResult ? fuseResult.map(fuseRes => fuseRes.item) : null
  // console.log(filteredFuseResult)


  
  const [searchQuery, setSearchQuery] = useState('');

  const searchOptions = {
    includeScore: true,
    shouldSort: true,
    
    minMatchCharLength: 1,
    findAllMatches: false,
    keys: ['name', 'details'],
  };

  const fuse = documents ? new Fuse(documents, searchOptions) : null;
  const fuseResult = documents ? fuse.search(searchQuery) : null;
  const filteredFuseResult = fuseResult ? fuseResult.map(fuseRes => (fuseRes.item)) : null;

  const showQuery = async (e) => {
    console.log(documents)
    
  }

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
    console.log(fuse)
    console.log(fuseResult)
    console.log(documents)
  }

  const filteredProjects = documents ? documents.filter((document) => {
    switch(currentFilter){
      case 'all':
        return true
      case 'development':
        return document.category === currentFilter
      case 'design':
        return document.category === currentFilter
      case 'marketing':
        return document.category === currentFilter
      case 'administration':
        return document.category === currentFilter
      case 'planning':
        return document.category === currentFilter
      default:
        return true
    }
  }) : null

  return (
    <div>
    {error && <p className="error">{error}</p>}
    {/* <Searchbar /> */}
    <p>
    Search: <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
    </p>
    {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
    
    {filteredFuseResult && searchQuery.length > 0
      ? <ProjectList projects={filteredFuseResult} />
      : filteredProjects
      ? <ProjectList projects={filteredProjects} />
      : <p></p>
    }
    
    </div>
  )
}
