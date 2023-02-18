import Controllers from '../Controllers';
import ProductsPage from '../Admin/ProductsPage';
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import * as api from '../../../Utils/StoreAPI'
import { Paging, Sorting } from '../../Footers/Paging';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../../Utils/Loading';
import { Dialog } from '../../../Utils/Dialog';
import AppContext from '../../../Context';

const ProductsList = () => {
  const { favs, setFavs } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  // client CSS classes
  const clientProductsContainerClasses = ["grid"];
  // admin CSS classes
  const adminContainerClasses = ["box-shadow-down", "list-row"];

  const clientContainerClassesRef = useRef();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [lastSnapshot, setLastSnapshot] = useState(null);
  const [filterObj, setFilterObj] = useState(null);

  const [loadingState, setLoadingState] = useState(true);
  const [dialogMsg, setDialogMsg] = useState("");
  const [item, setItem] = useState({});

  
  
  // fetching the counts of docs
  const { data: docsCount } = useQuery(
    ["docsCount", (filterObj?.value ? filterObj.value : "all")],
    () => api.getCountOfDocs("products", filterObj), {
    staleTime: 3000,
    enabled: Boolean(lastSnapshot !== undefined),
    refetchOnWindowFocus: false,
    notifyOnChangeProps:"tracked"
  }
  );
  // fetching the products docs
  const {
    data: productsDocs,
    isSuccess: snapShotReady,
  } = useQuery(["productsDocs", { filter: (filterObj?.value ? filterObj.value : "all"), pageNum: page }], () => api.getProductsPage("products", 7, filterObj, lastSnapshot), {
    enabled: Boolean(lastSnapshot !== undefined),
    refetchOnWindowFocus: false,
    staleTime: 5000,
    notifyOnChangeProps: "tracked",
  });
  
  // change the view in the client products container
  const handleChangeView = (view) =>{
    if (view === "list") {
      clientContainerClassesRef.current.classList.remove("grid")
      clientContainerClassesRef.current.classList.add("list")
    } else if (view === "grid") {
      clientContainerClassesRef.current.classList.remove("list")
      clientContainerClassesRef.current.classList.add("grid")
    }
  }
  // handle the next page of products
  const handleOnPagingClicked = (action) => {
    if (action === "next") {
      const snapShot = productsDocs.docs[productsDocs.docs.length - 1];
      setPage(pre => pre + 1)
      setLastSnapshot(snapShot);
    } else if (action === "prev") {
      setPage(pre => pre - 1);
      queryClient.invalidateQueries(["productsDocs", { filter: (filterObj?.value ? filterObj.value : "all"), pageNum: page }]);
      setLastSnapshot(undefined)
    }
  };
  // sorting the produtcs by the category
  const handleSortingList = useCallback(value => {
    
    const sorting = value === "الكل" ? null : { name: "category", sign: "==", value: value }
    setFilterObj(sorting)
    setPage(0)
    setLastSnapshot(null)
  }, []);
  // navigate to product preview or edit product
  const handleProductCardEvents = (action, value) => {
    setItem(value)
    if (action === "signIn") {
      setDialogMsg("signIn")
    } else if (action === "delete") {
      setDialogMsg("deleting")
    } else if (action === "viewProduct") {
      
    } else if (action === "edit") {
      navigate(`/${action}`, { state: { product: value, title: "تعديل منتج" } }); 
    }
    
  };
  const handleDialogActions = async (name)=>{
    if (name === "no"){
      setDialogMsg("")
      return
    } else if (name === "confirmeDeleting") {
      deleteProduct(item)
    } else if (name === "confirmSignIn") {
      api.login().then(()=>{
          api.initFirebaseAuth(u =>{
          if (u) {
            api.saveUserData("addProductToFav", item.id).then(async () => {
              const userFavs = await api.getUserFavs(u.uid)
              setFavs(userFavs)
              setDialogMsg("")
              setLoadingState(true)
            }).then(() => setLoadingState(false));
          }
        })
      })
    } 
  };
  // const if user not signed in
  const deleteProduct = async(pro)=>{
    try {
      await api.deleteProductDoc(pro, "products").then(value => {
        queryClient.invalidateQueries(["productsDocs", { filter: (filterObj?.value ? filterObj.value : "all"), pageNum: page }]);
      }).catch(err => {
        console.log("error from the main method", err)
      }) 
    } catch (err) {

    }
  }
  
  useEffect(() => {
    localStorage.getItem("cat") && handleSortingList(localStorage.getItem("cat"))
    return () => {
      handleSortingList()
    };
  }, [handleSortingList, location.state?.filter]);
  return (
    <div className='view-list-container'>
      <>
        {
          location.pathname === "/products" ?
            // return the client sorting controller
            <Controllers changeView={handleChangeView} onSortByCategory={handleSortingList} />
            : // return the admin sorting
            <Sorting defValue={filterObj?.value || "الكل"} onChangeValue={handleSortingList} />
        }
        {
          docsCount === 0 && docsCount !== undefined ?
            <h4 style={{ with: 100, textAlign: "center" }}>{"لا يوجد بيانات للعرض"}</h4>
            :
            <>{
              snapShotReady ?
                <>

                  {
                    location.pathname === "/products" ?
                      // return the client products container
                      <div ref={clientContainerClassesRef} className={clientProductsContainerClasses.join(" ")}>
                        {
                          productsDocs &&
                          <ProductsPage
                            onClick={handleProductCardEvents}
                            productsArr={productsDocs?.docs?.map(value => value.data())}
                            favs={favs}
                          />
                        }
                      </div>
                      :
                      // return the admin products container
                      <div className="dash-list-view">
                        <ProductsPage
                          cardClasses={adminContainerClasses.join(" ")}
                          onClick={handleProductCardEvents}
                          productsArr={productsDocs.docs.map(value => value.data())}
                          favs={favs}
                        />
                      </div>
                  }
                  <Paging
                    onClick={handleOnPagingClicked}
                    numberOfPages={docsCount}
                    pageNumber={page + 1}
                  />

                </>
                :
                (loadingState || !snapShotReady) && <Loading />
            }

            </>
        }

        {
          // showFavs && <ClientFav />
        }
      </>
      <>
        {
          dialogMsg === "deleting"?
            <Dialog message={"تـأكيد عملية الحذف؟"} noCaption={"إلغاء"} onClick={handleDialogActions} name={"confirmeDeleting"} />
        : dialogMsg === "signIn" ?
            <Dialog message={" يرجي تسجيل الدخول حتي تتمكن من الاضافة الي المفضلة"} onClick={handleDialogActions} noCaption={"إلغاء"} yesCaption={"تسجيل الدخول"} name={"confirmSignIn"} />
        : ""
        }
      </>
    </div>
    
  )

}


export default ProductsList;