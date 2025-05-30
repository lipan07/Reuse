import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    subTabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    subTabButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 5,
    },
    activeSubTabButton: { backgroundColor: '#007bff' },
    subTabButtonText: { fontSize: 16, color: '#555' },
    activeSubTabButtonText: { color: '#fff', fontWeight: 'bold' },
    userList: { padding: 10 },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        paddingHorizontal: 10,
    },
    userImage: { width: 50, height: 50, borderRadius: 25 },
    userInfo: { flex: 1, marginLeft: 10 },
    userName: { fontSize: 16, fontWeight: 'bold' },
    userPhone: { fontSize: 14, color: '#777' },
    userStatus: { fontSize: 12, color: '#999' },
    unfollowButton: { backgroundColor: '#ff3333', padding: 10, borderRadius: 8 },
    buttonText: { color: '#fff', fontWeight: '600' },
    separator: {
        height: 1,
        backgroundColor: '#b7c4ba',
        marginVertical: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    modalText: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    cancelButton: { flex: 1, padding: 10, margin: 4, backgroundColor: '#ccc', borderRadius: 8 },
    cancelButtonText: { textAlign: 'center', fontWeight: '600', color: '#333' },
    confirmButton: { flex: 1, padding: 10, margin: 4, backgroundColor: '#007bff', borderRadius: 8 },
    confirmButtonText: { textAlign: 'center', fontWeight: '600', color: '#fff' },
});
