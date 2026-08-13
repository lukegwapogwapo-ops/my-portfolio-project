public class Cellphone {

    private String brand;
    private final String owner;
    private int price;

    Cellphone(String brand, String owner, int price) {
        this.brand = brand;
        this.owner = owner;
        this.price = price;
    }

    public String getInfo() {
        return "Brand: " + brand +
               "\nOwner: " + owner +
               "\nPrice: " + price;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}