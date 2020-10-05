import React,{useState,useEffect,useRef} from 'react'


const postStyle = {
    color: 'blue',
    height: '200px',
    textAlign: 'center',
    padding: '5px 10px',
    background: 'pink',
    marginTop: '15px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  };
  
  const containerStyle = {
    maxWidth: '760px',
    margin: '0 auto'
  }


function InfiniteScroll() {
    const [postList,setPostList] = useState({
        list :[1,2,3,4]
    })
    //tracking on Which page we currently are
    const [page,setPage] = useState(1);
    //referencing loader
    const loader = useRef(null);

    useEffect(()=>{
        const option = {
            root : null,
            rootMargin : '20px',
            threshold:0
        }
        //컴포넌트 렌더링 완료시,initialize IntersectionObserver and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver,option);
        if (loader.current) {
            observer.observe(loader.current)
        }
    },[]);
    useEffect(()=>{
        //현재 page변할 때마다 실행하는 useEffect
        let addList = ['a','b','c','d'];
        const newList = setPostList({list : [...postList.list,...addList]});
    },[page])

    // 유저의 스크롤이 Load More div에 intersection(진입시) 무엇이 일어날지 다룸
    // 즉, 페이지 변수를 업데이트
    const handleObserver = (targetList)=>{
        const target = targetList[0];
        if (target.isIntersecting) {
            setPage(page=>page+1);
        }
    }

    const renderCard = postList.list.map((post,index)=>(
        <div key={index} className='post' style={postStyle}>
            <h2>{post}</h2>
        </div>
    ))
    return (
        <div className='container' style={containerStyle}>
            <div className='post-list'>
                {renderCard}
                <div className='loading' ref={loader}>
                    <h2>Load More</h2>
                </div>
            </div>
        </div>
    )
}


export default InfiniteScroll
