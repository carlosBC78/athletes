import {createRouter, createWebHistory} from 'vue-router';

import AthletesList from '../views/athletes/AthletesList.vue';
import AthleteDetail from '../views/athletes/AthleteDetail.vue';
import AthleteRegistration from '../views/athletes/AthleteRegistration.vue';

import ContactAthlete from '../views/requests/ContactAthlete.vue';
import RequestsReceived from '../views/requests/RequestsReceived.vue';

import CoursesList from '../views/courses/CoursesList.vue';
import CourseRegistration from '../views/courses/CourseRegistration.vue';
import CourseDetail from '../views/courses/CourseDetail.vue';

import UserAuth from '../views/auth/UserAuth.vue';

import NotFound from '../views/NotFound.vue';

import store from '../store/index';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/athletes'
        },
        {
            path: '/athletes', 
            component: AthletesList,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: '/auth', 
            component: UserAuth,
            meta: {
                requiresUnAuth: true
            }
        },
        {
            path: '/athletes/:id', 
            component: AthleteDetail, 
            props: true,
            // children: [
                
            // ]
        },
        {
            path: '/athletes/:id/contact',
            component: ContactAthlete
        },
        {
            path: '/athletes/:id/courses', 
            component: CoursesList
        }, //athletes/athleteId/courses
        {
            path: '/athletes/:id/courses/register', 
            component: CourseRegistration
        }, //athletes/athleteId/courses
        {
            path: '/athletes/:id/courses/:cid', 
            component: CourseDetail, 
            props: true
        },
        {
            path: '/register', 
            component: AthleteRegistration,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/requests', 
            component: RequestsReceived,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        }
    ]
});

router.beforeEach((to, _, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated'];
    if(to.meta.requiresAuth && !isAuthenticated){
        next('/auth');
    }else if(to.meta.requiresUnAuth && isAuthenticated){
        next('/athletes');
    }else{
        next();
    }

});

export default router;