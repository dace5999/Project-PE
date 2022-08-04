const DetailCart = ({ addToCart, productinfo }) => {
    return (
        <div className="backgrounddetails">
            <div className="details">
                <div className="big-image">
                    <img src={productinfo.productImageURl} alt="" />
                </div>
                <div className="box-detail">
                    <div className="row">
                        <h3>{productinfo.productName}</h3>
                        <span>{productinfo.price}.000đ</span>
                    </div>
                    <h5>{productinfo.productCode}</h5>
                    <p >{productinfo.productDescribe}</p>
                    <button onClick={() => addToCart(productinfo)} className="button-cart">
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DetailCart; 