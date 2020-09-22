/* eslint-disable no-inner-declarations */
'use strict';
{
    const otpArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author';

    //module 6. - OK
    //Switching throught articles, leftSidebar "ALL POSTS"
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
    //Creats links to the article which are on the leftSidebar "ALL POSTS"

    function generateTitleLinks(customSelector = ''){// customSelector add from 7.2
        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        /* for each article */
        const articles = document.querySelectorAll(otpArticleSelector + customSelector);// customSelector add from 7.2
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

    //JEST OK DO TEGO MOMENTU

    //module 7.2
    //Creats tag links at the bottom of each article
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

    //Switching throught articles via tags and creating list in ALL POSTS of articles with the clicked tag
    function tagClickHandler(event){
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        //console.log(clickedElement);
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        //console.log(href);
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        //console.log(tag);
        /* find all tag links with class active */
        const allActiveTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
        //console.log(allActiveTagLinks);
        /* START LOOP: for each active tag link */
        for(let activeTagLink of allActiveTagLinks){
            /* remove class active */
            activeTagLink.classList.remove('active');
            //console.log(activeTagLink);
        /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
        //console.log(allTagLinks);
        /* START LOOP: for each found tag link */
        for(let tagLink of allTagLinks){
            /* add class active */
            tagLink.classList.add('active');
            //console.log(tagLink);
        /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }

    function addClickListenersToTags(){
        /* find all links to tags */
        const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');
        //console.log(allTagsLinks);
        /* START LOOP: for each link */
        for(let tagLink of allTagsLinks){
            /* add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
        }
    }
    addClickListenersToTags();

    function generateAuthors(){
        /* find all articles */
        const allArticles = document.querySelectorAll(otpArticleSelector);
        //console.log(allArticles);
        /* START LOOP: for every article: */
        for(let article of allArticles){
        /* find author wrapper */
            const authorWrapper = article.querySelector(optArticleAuthorSelector);
            //console.log(authorWrapper);
            /* make html variable with empty string */
            let html = '';
            /* get authors from data-author attribute */
            const author = article.getAttribute('data-author');
            //console.log(author);
            /*generate HTML of the link*/
            const authorLinkHTML = '<a href="#' + author + '"><span>by ' + author + '</span></a>';
            /*add genarated code to html variable*/
            html = html + authorLinkHTML;
            //console.log(html);
            /* insert HTML of all the links into the tags wrapper */
            authorWrapper.innerHTML = html;
        /* END LOOP: for every article: */
        }
    }
    generateAuthors();

    function authorClickHandler(event){
        event.preventDefault();
        
        const clickedElement = this;
        console.log(clickedElement);

        const href = clickedElement.getAttribute('href');
        console.log(href);

        const author = href.replace('#author-', '');
        console.log(author);

        const allActiveAuthorLinks = document.querySelectorAll('a.active[href^="#author-"');
        console.log(allActiveAuthorLinks);

        for(let activeAuthorLink of allActiveAuthorLinks){
            activeAuthorLink.classList.remove('active');
        }
        const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
        console.log(allAuthorLinks);
        for(let authorLink of allAuthorLinks){
            authorLink.classList.add('active');
            console.log(authorLink);
        }
        generateTitleLinks('[data-author="' + author + '"]');
    }

    function addClickListenerToAuthors(){
        const allAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');
        console.log(allAuthorsLinks);
        for(let authorLink of allAuthorsLinks){
            authorLink.addEventListener('click', authorClickHandler);
            console.log(authorLink);
        }
    }
    addClickListenerToAuthors();

}