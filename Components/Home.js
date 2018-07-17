import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Button,Image,ScrollView} from 'react-native'
import {database} from '../Database'
class Home extends Component{
    static navigationOptions = {
        title: 'Home',
        header: null
      };
constructor(){
    super();
    this.state={
        notes:{}
    }
}

    componentWillMount(){
        this.setState({notes:{}})
    }

    componentDidMount(){   
        console.log('componentdidmount home')
        
    }

    async getData(){
        let notesRef=database.ref('/notes')
        await notesRef.once('value',(snapshot)=>{
            notes=snapshot.val()
            this.setState({notes:notes})
            console.log("notes from db: "+JSON.stringify(JSON.stringify(this.state.notes)))
        })
    }

    goToEdit(note,id){
        console.log("navigating to Edit "+JSON.stringify(note))
        this.setState({notes:{}})
        this.props.navigation.navigate("Edit",{
            note:note,
            id:id,
            updateNote:this.UpdateNote
        })
    }
    goToAdd(){
        console.log("navigating to Add ")
        this.setState({notes:{}})
        this.props.navigation.navigate("Add")
    }

    render(){
            this.getData()
            let noteIds = this.state.notes ?Object.keys(this.state.notes):null

        return(
            <ScrollView>
            <View style={{flex: 1,flexDirection: 'column'}}>
                <View style={{marginTop:50,justifyContent: 'center',alignItems: 'center'}}>
                <Image source={require('./../img/rnote2.png')}/>
                </View>
        
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                
                {noteIds!==null ? noteIds.map((noteId,index)=>(
                    
                    <TouchableOpacity key={index} onPress={()=>this.goToEdit(this.state.notes[noteId],noteId)} style={{width:140,height:120, margin:5, padding:10, overflow:'hidden',borderRadius:5}}>
                    <View  style={{ backgroundColor: '#C40A4D',padding:10,width:140,height:120,borderRadius:5}}>
                    
                        <Text style={{fontWeight:'bold', fontSize:20}}>
                            {this.state.notes[noteId].name}
                        </Text>
                        <Text style={{fontSize:15}}>
                            {this.state.notes[noteId].content}
                        </Text>
                        </View>
                    </TouchableOpacity>
                     
                )):<Text>There are no Notes to show</Text>}
                </View>
            
                <Button onPress={()=>this.goToAdd()} 
                title="Add Note"
                color="teal"
                />

            </View>
            </ScrollView>

        )


    }


}

export default Home