import java.util.Scanner;

public class numberone {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Read user's name
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();

        // Read user's age
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();

        // Print personalized greeting
        System.out.println("Hello, " + name + "! You are " + age + " years old.");

        scanner.close();
    }
}