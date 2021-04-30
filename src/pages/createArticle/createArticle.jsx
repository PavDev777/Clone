import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import ArticleForm from "../../components/articleForm";
import { CurrentUserContext } from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";

const CreateArticle = () => {

    const apiUrl = '/articles'
    const [{response, error}, doFetch] = useFetch(apiUrl) 
    const [currentUserState] = useContext(CurrentUserContext)
    const initialValues = {
        title: '',
        description: '',
        body: '',
        tagList: []
    }
    const [isSuccessfullsubmit, setIsSuccessfullSubmit] = useState(false)

    const handleSubmit = (article) => {
        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    } 

    useEffect(() => {
        if(!response) {
            return
        }
        setIsSuccessfullSubmit(true)
    }, [response])

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to='/' />
    }

    if (isSuccessfullsubmit) {
        return <Redirect to={`/articles/${response.article.slug}`} />
    }

  return (
    <div>
      <ArticleForm 
        errors={(error && error.errors) || {}} 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        />
    </div>
  );
};
export default CreateArticle;
