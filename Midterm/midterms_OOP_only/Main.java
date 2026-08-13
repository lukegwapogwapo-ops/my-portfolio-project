public class Main {
    public static void main(String[] args) {

        Cellphone obj = new Cellphone("Samsung", "Luke", 5999);

        obj.setBrand("iPhone");
        obj.setPrice(20000);

        System.out.println(obj.getInfo());
    }
}