import { StyleSheet, TextInput, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';

type Student = {
  id: number;
  name: string;
  age: number;
  grade: number;
}

const listStudent: Student[] = [
  { id: 1, name: 'Nguyen Van A', age: 20, grade: 8.5 },
  { id: 2, name: 'Tran Thi B', age: 22, grade: 7.0 },
  { id: 3, name: 'Le Van C', age: 21, grade: 9.0 },
  { id: 4, name: 'Pham Thi D', age: 23, grade: 6.5 },
  { id: 5, name: 'Hoang Van E', age: 20, grade: 8.0 },
];

const StudentList23pnv1a = () => {

  const [students, setStudents] = useState<Student[]>(listStudent);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const [grade, setGrade] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState<'asc' | 'des' | 'no'>('no');

  const deleteStudnet = (id: number) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
  }

  const addStudent = () => {
    if (name && age !== null && grade !== null) {
      const newStudent: Student = {
        id: students.length + 1,
        name: name,
        age: age,
        grade: grade,
      };
      setStudents([...students, newStudent]);
      setName('');
      setAge(null);
      setGrade(null);
    } else {
      Alert.alert('Vui lòng nhập đầy đủ thông tin học sinh');
    }
  }

  const updateSudent = (id: number) => {
    const updatedStudents = students.map(student => {
      if (student.id === id) {
        return {
          ...student,
          name: name || student.name,
          age: age !== null ? age : student.age,
          grade: grade !== null ? grade : student.grade
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quản lý Danh Sách Học Sinh</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm học sinh theo tên"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập tên học sinh"
        value={ name}
        onChangeText={text => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập tuổi"
        value={(age?.toString() ?? '')}
        onChangeText={text => setAge(Number(text))}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập điểm"
        value={(grade?.toString() ?? '')}
        onChangeText={text => setGrade(Number(text))}
      />

      <View style={{ alignItems: 'center', gap: 10 }}>
        {idSelected ? (
          <>
            <TouchableOpacity
              style={{ backgroundColor: 'orange', padding: 10, borderRadius: 5, marginBottom: 20 }}
              onPress={() => {
                updateSudent(idSelected);
                setIdSelected(null);
                setName('')
                setAge(null)
                setGrade(null)
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Cập Nhật Học Sinh</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: 'gray', padding: 10, borderRadius: 5, marginBottom: 20 }}
              onPress={() => setIdSelected(null)}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Hủy</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, marginBottom: 20 }}
            onPress={addStudent}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Thêm Học Sinh</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.text}>
        Tổng số học sinh tìm được: {students.filter(student =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).length}
      </Text>
      <Text style={styles.text}>
        Tổng số học sinh lớn hơn 8 điểm: {students.filter(student =>
          student.grade > 8
        ).length}
      </Text>
      <RadioButton.Group
        onValueChange={newValue => setIsSorting(newValue as 'asc' | 'des' | 'no')}
        value={isSorting} 
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <RadioButton value="no" />
          <Text>no</Text>
          <RadioButton value="asc" />
          <Text>asc</Text>
          <RadioButton value="des" />
          <Text>des</Text>
        </View>
      </RadioButton.Group>

      <FlatList
        data={students.filter(student =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) 
        ).sort((a,b)=> {
          if(isSorting == 'no'){
            return 0
          }else if (isSorting === 'asc'){
            return a.grade-b.grade
          }else{
            return b.grade-a.grade
          }
        })}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', paddingVertical: 10 }}>
            <Text>Tên: {item.name}</Text>
            <Text>Tuổi: {item.age}</Text>
            <Text>Điểm: {item.grade}</Text>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={() => {
                setIdSelected(item.id) 
                setName(item.name)
                setAge(Number(item.age))
                setGrade(Number(item.grade))
              }}>
                <Text>🖊</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteStudnet(item.id)}>
                <Text>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default StudentList23pnv1a

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
})
