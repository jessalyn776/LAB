import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Product {
    String name;
    double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
}

public class numbersix {
    public static void main(String[] args) {
        List<Product> products = new ArrayList<>();

        // Sample products added
        products.add(new Product("Product1", 45.00));
        products.add(new Product("Product2", 55.00));
        products.add(new Product("Product3", 70.00));
        products.add(new Product("Product4", 25.00));
        products.add(new Product("Product5", 100.00));

        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter price threshold: ");
        double threshold = scanner.nextDouble();

        long count = products.stream()
                             .filter(p -> p.price > threshold)
                             .count();

        System.out.println("Number of products with price greater than " + threshold + ": " + count);

        scanner.close();
    }
}