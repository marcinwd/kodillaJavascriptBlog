'use strict';
{    
    const otpArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

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

}