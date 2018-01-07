/**
 * Created by Petr on 28.11.2017.
 */
const style = {
    commentBox: {
        width:'80vw',
        margin:'0 auto',
        fontFamily:'Helvetica, sans-serif'
    },
    title: {
        textAlign:'center',
        textTransform:'uppercase'
    },
    commentList: {
        border:'3px solid #ddd',
        padding:'0 12px',
        maxHeight:'70vh',
        overflow:'scroll'
    },
    comment: {
        backgroundColor:'#fafafa',
        margin:'10px',
        padding:'3px 10px',
        fontSize:'1.35rem'
    },
    commentForm: {
        margin:'10px',
        display:'flex',
        flexFlow:'row wrap',
        justifyContent:'space-between'
    },
    commentFormAuthor: {
        minWidth:'150px',
        margin:'3px',
        padding:'0 10px',
        borderRadius:'3px',
        height:'30px',
        flex:'2'
    },
    commentFormText: {
        flex:'4',
        minWidth:'400px',
        margin:'3px',
        padding:'0 10px',
        height:'40px',
        borderRadius:'3px'
    },
    commentFormPost: {
        minWidth:'75px',
        flex:'1',
        height:'40px',
        margin:'5px 3px',
        fontSize:'1rem',
        backgroundColor:'#A3CDFD',
        borderRadius:'3px',
        color:'#fff',
        textTransform:'uppercase',
        letterSpacing:'.055rem',
        border:'none'
    },
    lastUpdate: {
        textDecoration:'none',
        paddingRight:'15px',
        fontSize:'1.1rem',
        textAlign: 'left',
        position: 'relative'
    },
    updateLink: {
        textDecoration:'none',
        paddingRight:'15px',
        fontSize:'1.1rem'
    },
    deleteLink: {
        textDecoration:'none',
        paddingRight:'15px',
        fontSize:'1.1rem',
        color:'red'
    },
    hr: {
        display: 'block',
        border: 'solid #ddd',
        borderWidth: '5px'
    },
    h1: {
        textAlign: 'center'
    }
}

module.exports = style;