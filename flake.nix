{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { nixpkgs, ... }: let
    system = builtins.currentSystem;

    in {
      devShells."${system}".default = let
        pkgs = import nixpkgs {
          inherit system;
        };

      in pkgs.mkShell {
        packages = with pkgs; [
          nodejs_22
          pnpm
          bun
        ];
      };
    };
}
