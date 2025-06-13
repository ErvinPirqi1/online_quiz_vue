import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import QuizPage from "../views/quiz/QuizList.vue";
import QuizDetailPage from "../views/quiz/QuizDetails.vue";
import QuizCreatePage from "../views/quiz/CreateQuiz.vue";
import QuizCreateQuestion from "../views/quiz/CreateQuestions.vue";
import QuizEditPage from "../views/quiz/EditQuiz.vue";
import QuizResultPage from "../views/quiz/QuizResult.vue";
import LoginPage from "../views/Login.vue";
import RegisterPage from "../views/Register.vue";
import About from "../components/About.vue";
import Contact from "../components/Contact.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/quiz",
    name: "Quizzes",
    component: QuizPage,
  },
  {
    path: "/quiz/:id",
    name: "QuizDetails",
    component: QuizDetailPage,
    props: true,
  },
  {
    path: "/quiz/createQuestion/:id",
    name: "QuizCreateQuestion",
    component: QuizCreateQuestion,
    props: true,
  },
  {
    path: "/quiz/CreateQuiz",
    name: "CreateQuiz",
    component: QuizCreatePage,
    props: true,
  },
  {
    path: "/quiz/edit/:id",
    name: "EditQuiz",
    component: QuizEditPage,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
