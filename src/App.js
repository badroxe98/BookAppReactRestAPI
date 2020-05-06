import React, { Component } from 'react';
import axios from 'axios'
import {Table,Modal,ModalBody,ModalFooter,ModalHeader,Button, FormGroup,Label,Input} from 'reactstrap'

class App extends Component{
  constructor(){
    super();
    this.state={books:[{
      
    }
    ],
    newBookData:{
        title:'',
        rating:'',
    }
    ,
    editBookData:{
      id:'',
      title:'',
      rating:''
    },
    newBookModal:false,
    editBookModal:false
    }
    this._refreshBooks=this._refreshBooks.bind(this);
  }


  componentWillMount(){
      this._refreshBooks();
  }

  toggleNewBookModal(){
    this.setState({
      newBookModal: !this.state.newBookModal
    })
  }

  toggleEditBookModal(){
    this.setState({
      editBookModal:!this.state.editBookModal
    })
  }

  addbook(){

    const book={
      title:this.state.newBookData.title,
      rating:this.state.newBookData.rating
    };

    console.log(book);

    axios.post('http://localhost:3000/books',book)
    .then(res => {
      let {books}=this.state;
      books.push(res.data);
      this.setState({
        books,
        newBookModal:false,
        newBookData:{
          title:'',
          rating:''
        }

      })
      console.log(res);
      console.log(res.data);
    })
  }

  updateBook(){
    let {title,rating}=this.state.editBookData;
      axios.put("http://localhost:3000/books/"+this.state.editBookData.id,{
        title,rating
      }).then((res)=>{
        console.log(res.data);
        this._refreshBooks();
      });
    this.setState({
      editBookModal:!this.state.editBookModal,
      editBookData:{
        id:'',
        title:'',
        rating:''
      }
    })
  }

  editBook(id,title,rating){
    console.log(title);
    this.setState({
      editBookData:{
        id,title,rating
      },
      editBookModal:!this.state.editBookModal
    })
  }

  deleteBook(id){
    axios
      .delete("http://localhost:3000/books/"+id)
      .then(res => console.log("Book deleted"))
      .catch(err => console.error(err));

    this._refreshBooks();
  }
  _refreshBooks(){
    axios.get('http://localhost:3000/books').then((response)=>{this.setState({books:response.data})})
  }
  
  render(){
    let books=this.state.books.map((book)=>{
        return(
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.rating}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.id ,book.title ,book.rating)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteBook.bind(this,book.id)}>Delete</Button>
          </td>
      </tr>)
      });
    
    
    return(
    <div className="App container">
      <h3>Books App</h3>
      <Button color="primary" className="my-3" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
      {/*----------------------------------Adding book modal-----------------------------------------------------------------------------------*/}

      <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book:</ModalHeader>
        <ModalBody>
          <FormGroup>
              <Label for="title">Book Title:</Label>
              <Input  name="title" placeholder="Enter the book title:" value={this.state.newBookData.title} onChange={(e)=>{
                let{newBookData}=this.state;
                
                
                newBookData.title=e.target.value;
                
                this.setState({
                  newBookData
                });

              }  
              } />
            </FormGroup>

            <FormGroup>
            <Label for="rating">Book's rating:</Label>
            <Input  name="rating" placeholder="Enter the book's rating" value={this.state.newBookData.rating} onChange={(e)=>{
              let {newBookData}=this.state;
              newBookData.rating=e.target.value;

              this.setState({
                newBookData
              })
            }} />
            </FormGroup>

        </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addbook.bind(this)}>Add the book </Button>{' '}
            <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/*----------------------------------Adding book modal-----------------------------------------------------------------------------------*/}
       
        {/*----------------------------------Editing book modal-----------------------------------------------------------------------------------*/}

        <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a book:</ModalHeader>
        <ModalBody>
          <FormGroup>
              <Label for="title">Book Title:</Label>
              <Input  name="title" placeholder="Enter the book title:" value={this.state.editBookData.title} onChange={(e)=>{
                let{editBookData}=this.state;
                
                
                editBookData.title=e.target.value;
                
                this.setState({
                  editBookData
                });

              }  
              } />
            </FormGroup>

            <FormGroup>
            <Label for="rating">Book's rating:</Label>
            <Input  name="rating" placeholder="Enter the book's rating" value={this.state.editBookData.rating} onChange={(e)=>{
              let {editBookData}=this.state;
              editBookData.rating=e.target.value;

              this.setState({
                editBookData
              })
            }} />
            </FormGroup>

        </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>Update the book </Button>{' '}
            <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/*----------------------------------Editing book modal-----------------------------------------------------------------------------------*/}

        <Table>
          <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
          </thead>

          <tbody>
              {books}
          </tbody>
        </Table>
    </div>)
  }

}
export default App;
