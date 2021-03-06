const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  // console.log(req.body.description)
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  // console.log(imageUrl)
  const description = req.body.description;
  const price = req.body.price;
  const product=new Product({title:title,
    price:price,
    description:description,
    imageUrl:imageUrl,
    userId:req.user._id
  })
  product.save().then(result=>{
    console.log(result)
    res.redirect('/admin/products')
  })
  .catch(err=>{
    console.log(err)
  })

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};
// };
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description
  const updatedPrice = req.body.price;
  Product.findById(prodId).then(product=>{
    product.title=updatedTitle;
    product.imageUrl=updatedImageUrl;
    product.description=updatedDesc;
    product.price=updatedPrice;
    return product.save()
  })
  .then(result=>{
    console.log('Updated Product')
    res.redirect('/admin/products')
  })
  .catch(err=>{
    res.redirect('/')
  })
}


exports.getProducts = (req, res, next) => {
  Product.find()
  // .select('title price -_id')
  // .populate('userId','name')
    .then(products => {
      console.log(products)
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.findByIdAndRemove(prodId)
  .then(()=>{console.log('Deleted')
  console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');})
  .catch((err)=>console.log(err))
}
