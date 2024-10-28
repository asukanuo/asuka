// import React from 'react'
import '@/App.css'
import '@/App1.less'
import { Demo1, Demo2 } from '@/components'
import React, { lazy, Suspense, useState } from 'react'
const LazyDemo = lazy(() => import('@/components/LazyDemo'))


import url from './assets/images/111.jpg'

const PreFetchDemo = lazy(() => import(
    /* webpackChunkName: "PreFetchDemo" */
    /*webpackPrefetch: true*/
    '@/components/PreFetchDemo'
))

function App() {
    const [show, setShow] = useState(false)

    const handleOnClick = () => {
        import('@/App')
        setShow(true)
    }
    return <>
        <h1>react脚手架</h1>
        <h2>Hello Asuka Langley Soryu</h2>
        <h3>使用webpack搭建</h3>
        <img src={url} alt="" />
        <Demo1 />
        <h2 onClick={handleOnClick}>展示</h2>
        {/* show为true时加载LazyDemo组件 */}
        {show && <Suspense fallback={null}><LazyDemo /></Suspense>}
        
    </>
}
export default App
// import { Suspense, lazy, useState } from 'react'
// // import '@/App.css'
// import lessStyles from '@/app.less'
// import scssStyles from '@/app.scss'
// import stylStyles from '@/app.styl'
// import smallImg from '@/assets/imgs/5kb_img.jpeg'
// import bigImg from '@/assets/imgs/10kb_img.png'
// import chengzi from '@/assets/imgs/chengzi.png'
// import memberList from './test.json'
// import ClassComp from '@/components/Class'
// import { Demo1, Demo2 } from '@/components'
// import { watchEnv, add } from '@/utils/watch'
// import LazyWrapper from '@/components/LazyWrapper'
// const LazyDemo = lazy(() => import('@/components/LazyDemo'))
// function App() {
//     const [count, setCounts] = useState('')
//     const [show, setShow] = useState(false)
//     const onChange = (e: any) => {
//         setCounts(e.target.value)
//     }
//     console.log('memberList', memberList)
//     // 点击事件中动态引入css, 设置show为true
//     const handleOnClick = () => {
//         import('@/App')
//         setShow(true)
//     }
//     return <div>
//         <h2>webpack5-react-ts</h2>
//         <div className={lessStyles['lessBox']}>
//             <div className={lessStyles['box']}>lessBox（east_white）
//                 <img src={smallImg} alt="小于10kb的图片" />
//                 <img src={bigImg} alt="大于于10kb的图片" />
//                 <img src={chengzi} alt="橙子font" />
//                 <div className={lessStyles['smallImg']}>小图片背景</div>
//                 <div className={lessStyles['bigImg']}>大图片背景</div>
//             </div>
//         </div>
//         <div className={scssStyles['scssBox']}>
//             <div className={scssStyles['box']}>scssBox</div>
//         </div>
//         <div className={stylStyles['stylBox']}>
//             <div className={stylStyles['box']}>stylBox</div>
//         </div>
//         <ClassComp />
//         <div>
//             <p>受控组件</p>
//             <input type="text" value={count} onChange={onChange} />
//             <br />
//             <p>非受控组件</p>
//             <input type="text" />
//         </div>
//         <Demo1 />
//         <div>{add(1, 2)}</div>
//         <>
//             <h2 onClick={handleOnClick}>展示</h2>
//             {/* show为true时加载LazyDemo组件 */}
//             {show && <Suspense fallback={null}><LazyWrapper path='LazyDemo' />
//             </Suspense>}
//         </>
//     </div>
// }
// export default App
