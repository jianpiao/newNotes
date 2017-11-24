import Vue from 'vue'
import Router from 'vue-router'
import NoteList from '../components/NoteList.vue'
import Editor from '../components/Editor.vue'
import DeleteNote from '../components/DeleteNote.vue'
import Home from '@/components/Home.vue'
import Favorite from '@/components/Favorite.vue'

Vue.use(Router)

export default new Router({
  routes: [
   	{   path: '/',
		redirect: '/home'
	},
	{   path: '*',
		redirect: '/home'
	},
	{
	    path: '/notelist',
	    component: NoteList
	},
	{
	    path: '/home/editor',
	    component: Editor
	},
	{
		path: '/notelist/deletenote',
		component: DeleteNote
	},
	{
		path: '/home',
		component: Home

	},
	{
		path: '/home/favorite',
		component: Favorite
	}
  ]
})
