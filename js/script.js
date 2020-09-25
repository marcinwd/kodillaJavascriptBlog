/* eslint-disable no-inner-declarations */
'use strict';
{
    const opt = {
        articleSelector: '.post',
        titleSelector: '.post-title',
        titleListSelector: '.titles',
        articleTagsSelector: '.post-tags .list',
        articleAuthorSelector: '.post-author',
        tagsListSelector: '.tags.list', //nie wykorzystywane dlaczego 
        cloudClassCount: '5',
        cloudClassPrefix: 'tag-size-',
        authorsListSelector: '.authors.list' //nie wykorzystywane dlaczego 
    };

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
        const titleList = document.querySelector(opt.titleListSelector);
        titleList.innerHTML = '';
        /* for each article */
        const articles = document.querySelectorAll(opt.articleSelector + customSelector);// customSelector add from 7.2
        let html = '';
        for(let article of articles){
            /* get the article id */
            const articleId = article.getAttribute('id');
            /* find the title element *//* get the title from the title element */
            const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
            /* create HTML of the link */
            const linkHTML = '<li><a href="#'+ articleId +'"><span>' + articleTitle + '</span></a></li>';
            /* create list of html links*/
            html += linkHTML;
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

    //module 7.3
    //Finding the min and max
    function calculateTagsParams(tags){
        //defining min and max of our parameters for tags
        const params = {min: '99999', max: '0'};
        for(let tag in tags){
            params.max = Math.max(tags[tag], params.max);
            params.min = Math.min(tags[tag], params.min);
        }
        return params;
    }
    //Getting the "x" for tag-six-X
    function calculateTagClass(count, params){
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1 );
        return classNumber;
    }

    //module 7.2; module 7.3 when [NEW 7.3]
    //Creats tag links at the bottom of each article & taglist on the right [NEW 7.3]
    function generateTags(){
        /*create a new variable allTags with an empty object*/
        let allTags = {};
        /*find all articles */
        const allArticles = document.querySelectorAll(opt.articleSelector);
        /* START LOOP: for every article: */
        for(let article of allArticles){
        /* find tags wrapper */
            const tagsWrapper = article.querySelector(opt.articleTagsSelector);
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
                html += ' ' + tagLinkHTML;
                /* check if this link is not already in allTags*/
                if(!allTags[tag]){
                    /* add tag to allTags object*/
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }
            /* END LOOP: for each tag */
            }
            /*find list of tags in the right column*/
            const tagList = document.querySelector(opt.tagsListSelector);
            /*[NEW 7.3 object] create variable for all links HTML code*/
            let allTagsHTML = '';
            const tagsParams = calculateTagsParams(allTags);
            /*[NEW 7.3 object] START LOOP for each tag in allTags*/
            for(let tag in allTags){
                //[NEW 7.3 object] generate links for the tag list
                const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="'+ opt.cloudClassPrefix +''+ calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>'; 
                //console.log(tagLinkHTML);
                /*[NEW 7.3 object] generate code of a link and ADD to allTagsHTML*/
                allTagsHTML += tagLinkHTML ;
                /*[NEW 7.3 object] END LOOP for each tag in allTags*/
            }
            /*[NEW 7.3 object]  ADD HTML from allTagsHTML to tagList*/
            tagList.innerHTML = allTagsHTML;

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
        //[JA]create a new empty object allAuthors
        let allAuthors = {};
        /* find all articles */
        const allArticles = document.querySelectorAll(opt.articleSelector);
        /* START LOOP: for every article: */
        for(let article of allArticles){
        /* find author wrapper */
            const authorWrapper = article.querySelector(opt.articleAuthorSelector);
            //console.log(authorWrapper);
            /* make html variable with empty string */
            let html = '';
            /* get authors from data-author attribute */
            const author = article.getAttribute('data-author');
            console.log(author);
            /*generate HTML of the link*/
            const authorLinkHTML = '<a href="#author-' + author + '"><span>by ' + author + '</span></a>';
            /*add genarated code to html variable*/
            html +=  authorLinkHTML;
            //console.log(html);
            /* insert HTML of all the links into the tags wrapper */
            authorWrapper.innerHTML = html;

            if(!allAuthors[author]){
                allAuthors[author] = 1;
            } else {
                allAuthors[author]++;
            }
            //[JA] find authors
            const authorsList = document.querySelector(opt.authorsListSelector);
            console.log(authorsList);
            //[JA] variable for all authors links HTML code
            let allAuthorsHTML = '';
            const authorsParams = calculateTagsParams(allAuthors);
            console.log(authorsParams);
            //console.log(allAuthorsHTML);
            for(let author in allAuthors){
            //generate links for author list
                const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>'; 
                console.log(authorLinkHTML);
                allAuthorsHTML += authorLinkHTML;
            }
            authorsList.innerHTML = allAuthorsHTML;
        /* END LOOP: for every article: */
        }
    }
    generateAuthors();

    function authorClickHandler(event){
        event.preventDefault();
        
        const clickedElement = this;
        //console.log(clickedElement);

        const href = clickedElement.getAttribute('href');
        //console.log(href);

        const author = href.replace('#author-', '');
        //console.log(author);

        const allActiveAuthorLinks = document.querySelectorAll('a.active[href^="#author-"');
        //console.log(allActiveAuthorLinks);

        for(let activeAuthorLink of allActiveAuthorLinks){
            activeAuthorLink.classList.remove('active');
        }
        const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
        //console.log(allAuthorLinks);
        for(let authorLink of allAuthorLinks){
            authorLink.classList.add('active');
            console.log(authorLink);
        }
        generateTitleLinks('[data-author="' + author + '"]');
    }

    function addClickListenerToAuthors(){
        const allAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');
        //console.log(allAuthorsLinks);
        for(let authorLink of allAuthorsLinks){
            authorLink.addEventListener('click', authorClickHandler);
            //console.log(authorLink);
        }
    }
    addClickListenerToAuthors();

}