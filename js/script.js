/* eslint-disable no-inner-declarations */
'use strict';
{

    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
        authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),

        tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
        authorListLink : Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
    };

    const opt = {
        articleSelector: '.post',
        titleSelector: '.post-title',
        titleListSelector: '.titles',
        articleTagsSelector: '.post-tags .list',
        articleAuthorSelector: '.post-author',
        tagsListSelector: '.tags.list',  
        cloudClassCount: '5',
        cloudClassPrefix: 'tag-size-',
        authorsListSelector: '.authors.list' 
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
            /*[NEW 7.4 handlebars] create HTML of the link  */
            const linkHTMLData = {id: articleId, title: articleTitle};
            const linkHTML = templates.articleLink(linkHTMLData);
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
                /*[NEW 7.5 Handlebars] generate HTML of the link */
                const linkHTMLData = {id: tag, tag: tag};
                const tagLinkHTML = templates.tagLink(linkHTMLData);
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
            /*[NEW 7.5 handlebars] create empty object with tag as a key for all links HTML code*/
            const allTagsData = {
                tags: []
            };
            //let allTagsHTML = '';
            const tagsParams = calculateTagsParams(allTags);
            /*[NEW 7.3 object] START LOOP for each tag in allTags*/
            for(let tag in allTags){
                /*[NEW 7.5 handlebars] ADD to object allTagsData ln139*/
                allTagsData.tags.push({
                    tag: tag,
                    count: allTags[tag],
                    className: calculateTagClass(allTags[tag], tagsParams),
                });
                /*[NEW 7.3 object] END LOOP for each tag in allTags*/
            }
            /*[NEW 7.5 handlebars]  ADD HTML to tagList*/
            tagList.innerHTML = templates.tagCloudLink(allTagsData);
            
            //tagList.innerHTML = allTagsHTML;

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
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        const allActiveTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
        /* START LOOP: for each active tag link */
        for(let activeTagLink of allActiveTagLinks){
            /* remove class active */
            activeTagLink.classList.remove('active');
        /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each found tag link */
        for(let tagLink of allTagLinks){
            /* add class active */
            tagLink.classList.add('active');
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
            /* make html variable with empty string */
            let html = '';
            /* get authors from data-author attribute */
            const author = article.getAttribute('data-author');
            /*[NEW 7.5 Handlebars] generate HTML of the link*/
            const linkHTMLData = {id: author, author: author};
            const authorLinkHTML = templates.authorLink(linkHTMLData);
            /*add genarated code to html variable*/
            html +=  authorLinkHTML;
            /* insert HTML of all the links into the tags wrapper */
            authorWrapper.innerHTML = html;

            if(!allAuthors[author]){
                allAuthors[author] = 1;
            } else {
                allAuthors[author]++;
            }
            //[JA] find authors
            const authorsList = document.querySelector(opt.authorsListSelector);
            //[JA 7.5 handlebars] const object for all authors links HTML code
            const allAuthorsData = {
                authors: []
            };
            //let allAuthorsHTML = '';
            for(let author in allAuthors){
            //[JA 7.5 handlebars] generate links for author list
                allAuthorsData.authors.push({
                    author: author,
                    count: allAuthors[author],
                });
                //allAuthorsHTML += authorLinkHTML;
            }
            //[JA 7.5 handlebars] ADD HTML via template
            authorsList.innerHTML = templates.authorListLink(allAuthorsData);
            //authorsList.innerHTML = allAuthorsHTML;
        /* END LOOP: for every article: */
        }
    }
    generateAuthors();

    function authorClickHandler(event){
        event.preventDefault();
        const clickedElement = this;
        const href = clickedElement.getAttribute('href');
        const author = href.replace('#author-', '');
        const allActiveAuthorLinks = document.querySelectorAll('a.active[href^="#author-"');
        for(let activeAuthorLink of allActiveAuthorLinks){
            activeAuthorLink.classList.remove('active');
        }
        const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

        for(let authorLink of allAuthorLinks){
            authorLink.classList.add('active');
        }
        generateTitleLinks('[data-author="' + author + '"]');
    }

    function addClickListenerToAuthors(){
        const allAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');
        for(let authorLink of allAuthorsLinks){
            authorLink.addEventListener('click', authorClickHandler);
        }
    }
    addClickListenerToAuthors();

}