import Vue from 'vue'
import Router from 'vue-router'
import HomeView from './views/HomeView.vue'
import ShowMovie from './views/ShowMovie'
import HotShowing from './views/HotShowing'
import SearchView from './views/SearchView'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'homeview',
            component: HomeView
        },
        {
            path: '/findmovie',
            name: 'findmovie',
            component: () => import('./views/FindMovie.vue'),
            redirect: '/findmovie/hotshowing',
            children: [
                {
                    path: '/findmovie/hotshowing',
                    name: 'hotshowing',
                    component: HotShowing,
                },
                {
                    path: '/findmovie/showmovie',
                    name: 'showmovie',
                    component: ShowMovie
                }
            ]
        },
        {
            path: '/bookview',
            name: 'bookview',
            component: () => import('./views/BookView.vue'),
        },
        {
            path: '/musicview',
            name: 'musicview',
            component: () => import('./views/MusicView.vue'),
        },
        {
            path: '/grouplist',
            name: 'grouplist',
            component: () => import('./views/GroupList.vue'),
        },
        {
            path: '/groupview',
            name: 'groupview',
            component: () => import('./views/GroupView.vue'),
        },
        {
            path: '/locationview',
            name: 'locationview',
            component: () => import('./views/LocationView.vue'),
        },
        {
            path: '/smallvideo',
            name: 'smallvideo',
            component: () => import('./views/SmallVideo.vue'),
        },
        {
            path: '/eventview',
            name: 'eventview',
            component: () => import('./views/EventView.vue'),
        },
        {
            path: '/othersongs',
            name: 'othersongs',
            component: () => import('./views/OtherSongs.vue'),
        },
        {
            path: '/otherbooks',
            name: 'otherbooks',
            component: () => import('./views/OtherBooks.vue'),
        },
        {
            path: '/othermovies',
            name: 'othermovies',
            component: () => import('./views/OtherMovies.vue'),
        },
        {
            path: '/bookcontent',
            name: 'bookcontent',
            component: () => import('./views/BookContent.vue'),
        },
        {
            path: '/musiccontent',
            name: 'musiccontent',
            component: () => import('./views/MusicContent.vue'),
        },
        {
            path: '/loginview',
            name: 'loginview',
            component: () => import('./views/LoginView.vue'),
        },
        {
            path: '/registerview',
            name: 'registerview',
            component: () => import('./views/RegisterView.vue'),
        },
        {
            path: '/searchview',
            name: 'searchview',
            component: SearchView,
        }

    ],
    linkActiveClass: 'link-active',
})