/* eslint-disable no-inner-declarations */
'use strict';
{
    const otpArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list';

    //module 6.3
    const titleClickHandler = function(event){
        event.preventDefault();
        const clickedElement = this;
        /*[DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');
        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }
        /*[DONE] add class 'active' to the clicked link */
        clickedElement.classList.add('active');
        /*[DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts .post.active');
        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
        }
        /*[DONE] get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');
        /*[DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);
        /*[DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active');
    };

    //module 6.4
    // eslint-disable-next-line no-inner-declarations
    function generateTitleLinks(){
        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        /* for each article */
        const articles = document.querySelectorAll(otpArticleSelector);
        let html = '';
        for(let article of articles){
            /* get the article id */
            const articleId = article.getAttribute('id');
            /* find the title element *//* get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            /* create HTML of the link */
            const linkHTML = '<li><a href="#'+ articleId +'"><span>' + articleTitle + '</span></a></li>';
            /* create list of html links*/
            html = html + linkHTML;
        }
        /* insert link into titleList */
        titleList.innerHTML = html;
        /*moved from clickTitleHandler in order to listen after we have created the links*/
        const links = document.querySelectorAll('.titles a');
        for(let link of links){
            link.addEventListener('click', titleClickHandler);
        }
    }
    generateTitleLinks();

    //module 7.2
    function generateTags(){
        /* find all articles */
        const allArticles = document.querySelectorAll(otpArticleSelector);
        /* START LOOP: for every article: */
        for(let article of allArticles){
        /* find tags wrapper */
            const tagsWrapper = article.querySelector(optArticleTagsSelector);
            /* make html variable with empty string */
            let html = '';
            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            /* split tags into array */
            const articleTagsArray = articleTags.split(' ');
            /* START LOOP: for each tag */
            for(let tag of articleTagsArray){
                /* generate HTML of the link */
                const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
                /* add generated code to html variable */
                html = html + ' ' + tagLinkHTML;
            /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            tagsWrapper.innerHTML = html;
        /* END LOOP: for every article: */
        }
    }
    generateTags();

}
