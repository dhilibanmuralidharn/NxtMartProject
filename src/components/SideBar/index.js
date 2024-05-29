import './index.css'

const SideBar = props => {
  const {eachList, handleActiveCatogory, isActive} = props
  const {categoryName} = eachList

  const activeClassName = isActive ? 'isActive' : 'sidebar-category'
  const activeCategory = () => {
    handleActiveCatogory(categoryName)
  }

  return (
    <li>
      <p className={activeClassName} onClick={activeCategory}>
        {categoryName}
      </p>
    </li>
  )
}

export default SideBar
