import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import ArticleForm from '../../components/articleForm'
import { CurrentUserContext } from '../../contexts/currentUser'
import useFetch from '../../hooks/useFetch'

const EditArticle = ({match}) => {
    const slug = match.params.slug
    const apiUrl = `/articles/${slug}`
    const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
    const [{response: updateArticleResponse, error: updateArticleError}, doUpdateArticle] = useFetch(apiUrl)
    const [initialValues, setInitialValues] = useState(null)
    const [currentUserState] = useContext(CurrentUserContext)
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

    const handleSubmit = article => {
        doUpdateArticle({
            method: 'put',
            data: {
                article
            }
        }) 
    }

    useEffect(() => {
        doFetchArticle()
    }, [doFetchArticle])

    useEffect(() => {
        if(!fetchArticleResponse) {
            return
        }

        setInitialValues({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList
        })
    }, [fetchArticleResponse])

    useEffect(() => {
        if(!updateArticleResponse) {
            return
        }

        setIsSuccessfullSubmit(true)
    }, [updateArticleResponse])

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to='/' />
    }

    if (isSuccessfullSubmit) {
        return <Redirect to={`/articles/${slug}`} />
    }

    return (
        <ArticleForm 
            onSubmit={handleSubmit}
            errors={(updateArticleError && updateArticleError.erros) || {}}
            initialValues={initialValues}
        />
    )
}
export default EditArticle