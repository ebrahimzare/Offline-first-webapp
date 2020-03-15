import {GLOBAL} from './types'

export const changeHeaderTitle = (header_title) => {
    return { type: GLOBAL.UPDATE_HEADER, header_title};
  };

export const updateUserType = (isServiceWorker) => ({
    type: GLOBAL.UPDATE_USER_TYPE,
    isServiceWorker
}); 

//addToVisitSuccess no duplicates and no same path
//same path
  
export const addToVisitedPage = (visited_page, page_info, index) => dispatch =>{
if(visited_page[visited_page.length-1].path_number === page_info.path_number){
  if(visited_page[visited_page.length -1].page_name === page_info.page_name)
  dispatch(returnVisitedPage(visited_page));
  else{
    dispatch(replaceVisitedPageIndex(visited_page, page_info,index))

  }
}
else {
  if(visited_page[visited_page.length -1].path_number > page_info.path_number){
    if(visited_page[index].page_name !== page_info.page_name)	
      dispatch(replaceVisitedPageIndex(visited_page, page_info,index));
      if(visited_page.length-1 > page_info.path_number){
        visited_page = visited_page.slice(0,(index+1));
      }
    dispatch(returnVisitedPage(visited_page));
  }else
  dispatch(addToVisitedPageSuccess(visited_page, page_info))
}
};

export const replaceVisitedPageIndex = (visited_page, page_info, index) => dispatch => {

  visited_page[index] = page_info;
  dispatch(returnVisitedPage(visited_page));
}

export const returnVisitedPage = (visited_page) => (
  {
    type: GLOBAL.RETURN_VISITED_PAGE,
    visited_page: [...visited_page]
  });
  
export const addToVisitedPageSuccess = (visited_page, page_info) => (
{
  type: GLOBAL.ADD_VISITED_PAGE_SUCCESS,
  visited_page: [...visited_page, page_info]
});

