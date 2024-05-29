const { userId, token } = useContext(AuthContext);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [totalPrice, setTotalPrice] = useState(0);

const fetchData = async () => {
  setLoading(true);
  try {
    const userData = await fetchUserData(userId, token);
    console.log(userData);
    setUser(userData);
  } catch (error) {
    console.error("Error fetching user data", error);
  } finally {
    setLoading(false);
  }
};

if (userId && token) {
  fetchData();
}

export default fetchData;
